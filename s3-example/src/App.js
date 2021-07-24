import { Button, HStack, Avatar, Center, VStack, Box, Text } from '@chakra-ui/react';
import React from 'react';
import {createStore, createApi} from 'effector';
import {useStore} from 'effector-react';
import { nanoid } from 'nanoid';
import produce, {enableMapSet} from "immer";
enableMapSet();

const colors = {
  default: '#EDFDFD',
  hover: '#C4F1F9',
  selected: '#9DECF9'
}

const $avatars = createStore({
  avatars: new Map(),
  currentAvatar: null
});

const AvatarApi = createApi($avatars, {
  push: produce((state, payload) => {
    state.avatars.set(payload.id, payload.avatarName);
  }),
  setAvatar: produce((state, id) => {
    state.currentAvatar = state.avatars.get(id);
  })
});

function Uploader() {
  const avatarState = useStore($avatars);
  const refFileInputElement = React.useRef(null);
  const handleSubmission = e => {
    if (refFileInputElement.current.files[0] 
        && (/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i).test(refFileInputElement.current.files[0].name)
        && !Array.from(avatarState.avatars).some(a => a[1] === refFileInputElement.current.files[0].name)) {
      fetch(
        `http://localhost:9444/social/${refFileInputElement.current.files[0].name}`,
        {
          method: 'PUT',
          body: refFileInputElement.current.files[0],
        }
      )
        .then((result) => {
          if(result.status === 200) AvatarApi.push({ id: nanoid(), avatarName: refFileInputElement.current.files[0].name})
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };
  return(
    <HStack>
       <input ref={refFileInputElement} type="file" name="file"/>
       <div>
         <Button onClick={handleSubmission}>Submit</Button>
       </div>
     </HStack>
   )
}

function AvatarItem(props) {
  const avatarState = useStore($avatars);
  const mouseOverHandler = e => {
    e.currentTarget.style.cursor = 'pointer';
    e.currentTarget.style.backgroundColor = colors.hover;
  };
  const mouseLeaveHandler = e => {
    e.currentTarget.style.cursor = 'none';
    e.currentTarget.style.backgroundColor = avatarState && avatarState.currentAvatar === e.currentTarget.children[1].innerText ? colors.selected : colors.default;
  };
  const clickHandler = e => {
    AvatarApi.setAvatar(props.id);
    Array.from(e.currentTarget.parentNode.children).forEach(el => el.style.backgroundColor = colors.default);
    e.currentTarget.style.backgroundColor = colors.selected;
  }
  return (
  <Center width="300px" bg="cyan.50" borderRadius="12" margin={3} padding={3} onMouseOver={mouseOverHandler} onMouseLeave={mouseLeaveHandler} onClick={clickHandler}>
    <Avatar src={`http://localhost:9444/ui/social/${props.avatar}`} marginRight={5}/>
    <Text fontSize="xl">{props.avatar}</Text>
  </Center>);
}

function AvatarList() {
  const avatarState = useStore($avatars);
  return(
    <Box padding="3">
        {Array.from(avatarState.avatars).map(a => <AvatarItem avatar={a[1]} key={a[0]} id={a[0]}/>)}
    </Box>)
}

function App() {
  const avatarState = useStore($avatars);
  React.useEffect(() => {
    fetch('http://localhost:9444/social')
    .then(response => response.text())
    .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
    .then(d => Array.from(d.children[0].children)
                .filter(c => c.tagName === 'Contents')
                .map(c => c.children[0].innerHTML)
                .forEach(c => AvatarApi.push({ id: nanoid(), avatarName: c})));
  }, [])
  return (
    <Center marginTop={10}>
      <VStack>
        <Avatar src={avatarState.currentAvatar ? `http://localhost:9444/ui/social/${avatarState.currentAvatar}` : ''} size="2xl"/>
        <Uploader />
        <AvatarList />
      </VStack>
    </Center>
  );
}

export default App;

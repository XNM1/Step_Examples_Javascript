import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react-lite"
import Gun from 'gun'
import React, { useState } from 'react'
import { Center, VStack, Input, Button, HStack, Checkbox, Text, Flex, Spacer, Box } from "@chakra-ui/react"
import { CloseIcon, EditIcon, CheckIcon } from '@chakra-ui/icons'

class TodoList {
    todos = new Map()

    constructor() {
        makeAutoObservable(this);
    }

    has(id) {
        return this.todos.has(id);
    }

    add(id, task) {
        this.todos.set(id, task);
    }

    edit(id, task) {
        this.todos.set(id, task);
    }

    del(id) {
        this.todos.delete(id);
    }

}

class GunService {

    constructor(uri) {
        this.gun = Gun(uri);
    }

    listen(todoList) {
        const clb = (task, id) => {
            if(!todoList.has(id)) todoList.add(id, task);
            else if(!task) todoList.del(id);
            else todoList.edit(id, task);
        }
        this.gun.get('todos').map().once(clb);
        this.gun.get('todos').map().on(clb);
    }

    check(id) {
        this.gun.get('todos').get(id).put( { checked: true } );
    }

    uncheck(id) {
        this.gun.get('todos').get(id).put( { checked: false } );
    }

    add(task) {
        this.gun.get('todos').set(task);
    }

    edit(id, task) {
        this.gun.get('todos').get(id).put(task);
    }

    del(id) {
        this.gun.get('todos').get(id).put(null);
    }
}

let todoList = new TodoList();
const gunService = new GunService('http://localhost:8765/gun');
gunService.listen(todoList);

function TodoItem(props) {
    const refTextElement = React.useRef(null);
    const refInputElement = React.useRef(null);
    const [editState, setEditState] = useState(false);
    const changeCheckboxHandler = e => {
        if(e.currentTarget.checked) {
            refTextElement.current.style.textDecoration = 'line-through';
            gunService.check(props.id);
        }
        else {
            refTextElement.current.style.textDecoration = 'none';
            gunService.uncheck(props.id);
        }
    };
    const closeClickHandler = e => {
        gunService.del(props.id);
    };
    const editClickHandler = e => {
        setEditState(true);
    };
    const doneClickHandler = e => {
        gunService.edit(props.id, { text: refInputElement.current.value} );
        setEditState(false);
    }
    const enterPressInputHandler = e => {
        if(e.key === 'Enter') {
            gunService.edit(props.id, { text: refInputElement.current.value} );
            setEditState(false);
        }
    }
    const mouseOverHandler = e => { e.currentTarget.style.background='#B2F5EA'; e.currentTarget.style.cursor='pointer'; }
    const mouseLeaveHandler = e => { e.currentTarget.style.background='#00000000'; e.currentTarget.style.cursor='pointer'; }

    React.useEffect(() => {
        if(refInputElement.current) refInputElement.current.value = props.task.text;
    });
    if(editState) return (
    <Flex margin="2">
        <Box colorScheme="green" bg="cyan.50" borderRadius="12" padding="3">
            <HStack width="525px">
                <Input ref={refInputElement} onKeyPress={enterPressInputHandler}/>
                <Spacer />
                <CheckIcon onClick={doneClickHandler} onMouseOver={mouseOverHandler} onMouseLeave={mouseLeaveHandler} w={7} h={7} padding={1} borderRadius={3} color="green.300" />
                <CloseIcon onClick={closeClickHandler} onMouseOver={mouseOverHandler} onMouseLeave={mouseLeaveHandler} w={6} h={6} padding={1} borderRadius={3} color="red.300" align="flex-end"/>
            </HStack>
        </Box>
    </Flex>)
    else return (
    <Flex margin="2">
        <Checkbox isChecked={props.task.checked} onChange={changeCheckboxHandler} colorScheme="green" bg="cyan.50" borderRadius="12" padding="3">
            <HStack width="500px">
                <Text style = {{
                    textDecoration: props.task.checked ? 'line-through' : 'none'
                }} ref={refTextElement} fontSize="xl">{props.task.text}</Text>
                <Spacer />
                <EditIcon onClick={editClickHandler} onMouseOver={mouseOverHandler} onMouseLeave={mouseLeaveHandler} w={7} h={7} padding={1} borderRadius={3} color="blue.300" />
                <CloseIcon onClick={closeClickHandler} onMouseOver={mouseOverHandler} onMouseLeave={mouseLeaveHandler} w={6} h={6} padding={1} borderRadius={3} color="red.300" align="flex-end"/>
            </HStack>
        </Checkbox>
    </Flex>);
}

const TodosList = observer(() => {
    return <div> {Array.from(todoList.todos).map(t => <TodoItem task={t[1]} key={t[0]} id={t[0]}/>)}</div>
});

function InputTask() {
    let refElem = React.useRef(null);
    const enterPressInputHandler = e => {
        if(e.key === 'Enter') {
            gunService.add({ text: refElem.current.value, checked: false });
            refElem.current.value = '';
        }
    };
    const clickButtonHandler = e => {
        e.preventDefault();
        gunService.add({ text: refElem.current.value, checked: false });
        refElem.current.value = '';
    };
    return (
    <HStack width="500px">
        <Input placeholder="Enter task" ref={refElem} onKeyPress={enterPressInputHandler}/>
        <Button onClick={clickButtonHandler}>Add</Button>
    </HStack>);
}

function App() {

    return (
    <Center>
        <VStack marginTop={10}>
            <InputTask />
            <TodosList />
        </VStack>
    </Center>);
}

export default App;

class CharactersState {
  constructor() {
    this.characters = [];
  }
  change(info) {
    this.characters.push(...info.results);
  }
}

class CharactersModel {
  constructor(page = 1) {
    this.page = page;
    this.initPage = page;
    this.url = `https://rickandmortyapi.com/api/character/?page=`;
    this.currentInfo = null;
    this.isEnd = false;
    this.countPages = 1;
  }
  async next() {
    if (!this.isEnd) {
      let result = await fetch(this.url + this.page);
      this.currentInfo = await result.json();
      if (this.page === this.initPage)
        this.countPages = this.currentInfo.info.pages;
      this.page++;
    }
    if (this.page === this.countPages + 1) this.isEnd = true;
    return this.currentInfo;
  }
}
///////////////////////////////////////////////////////////////////////

class CharactersListView {
  constructor() {
    let charactersContainer = document.createElement("div");
    charactersContainer.innerHTML = document.getElementById('listContainer').innerHTML;
    this.result = charactersContainer.children[0];
  }
  update(cs) {
    this.result.innerHTML = "";
    cs.characters.forEach((c) => {
      this.result.append(new CharactersItemListView(c).result);
    });
  }
}

class CharactersItemListView {
  constructor(character) {
    let characterContainer = document.createElement("div");
    characterContainer.innerHTML = document.getElementById('listItemContainer').innerHTML
      .replace(/{{image}}/, character.image)
      .replace(/{{name}}/, character.name)
      .replace(/{{status}}/, character.status)
      .replace(/{{colorStatus}}/, character.status == 'Alive' ? 'text-green-500' : character.status == 'Dead' ? 'text-red-500' : 'text-black')
      .replace(/{{species}}/, character.species);
    this.result = characterContainer.children[0];
  }
}

class CharactersUpdateController {
  constructor(charactersListView, charactersModel, charactersState) {
    this.charactersListView = charactersListView;
    this.charactersModel = charactersModel;
    this.charactersState = charactersState;

    (async () => {
      this.charactersState.change(await this.charactersModel.next());
      this.charactersListView.update(this.charactersState);
    })();

    this.charactersListView.result.addEventListener('scroll', async (event) => {
      let element = event.target;
      if (element.scrollHeight - element.scrollTop === element.clientHeight) {
        this.charactersState.change(await this.charactersModel.next());
        this.charactersListView.update(this.charactersState);
      }
    });
  }
}

/////////////////////////////////////////////////////////////////////
window.onload = () => {
  let cs = new CharactersState();
  let cm = new CharactersModel();
  let clv = new CharactersListView();
  let cuc = new CharactersUpdateController(clv, cm, cs);

  document.body.append(clv.result);
}
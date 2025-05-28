import IdeasApi from "../services/ideasApi";
import IdeaList from "./IdeaList";

class IdeaForm {
  constructor(){
    this._formModal = document.querySelector('#form-modal');
    this._ideaList = new IdeaList();
  }

  addEventListener(){
    this._form.addEventListener('submit', this.handaleSubmit.bind(this))
  }

   async handaleSubmit(e){
    e.preventDefault();

    if(!this._form.elements.text.value || !this._form.elements.tag.value || !this._form.elements.text.value){
      alert('Please enter all fields')
      return;
    }

    const idea ={
      text: this._form.elements.text.value,
      tag: this._form.elements.tag.value,
      username: this._form.elements.username.value,
    }

    //add idea to server
    const newIdea = await IdeasApi.createIdea(idea);

    //add idea to list
    this._ideaList.addIdeaToList(newIdea.data.data)

    //save user to the local storage
    localStorage.setItem('username',this._form.elements.username.value);

    //render the form again 
    this.render()

    //clear fields

    this._form.elements.text.value = '';
    this._form.elements.tag.value = '';
    this._form.elements.username.value = '';
    
    document.dispatchEvent(new Event('closeModal'))
  }

  render(){
    this._formModal.innerHTML = `
    <form id="idea-form">
    <div class="form-control">
      <label for="idea-text">Enter a Username</label>
      <input type="text" name="username" id="username" value="${
        localStorage.getItem('username') ?
        localStorage.getItem('username'): ''
      }"/>
    </div>
    <div class="form-control">
      <label for="idea-text">What's Your Idea?</label>
      <textarea name="text" id="idea-text"></textarea>
    </div>
    <div class="form-control">
      <label for="tag">Tag</label>
      <input type="text" name="tag" id="tag" />
    </div>
    <button class="btn" type="submit" id="submit">Submit</button>
  </form>
    `;
    this._form = document.getElementById('idea-form')
    this.addEventListener();
  }
}

export default IdeaForm;
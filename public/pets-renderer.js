    /**
     * @class Responsible for rendering pets and comments in the HTML
     */
class PetsRenderer {
    constructor() {
        this.$pets = $(".pets");
        this.$petTemplate = $('#pet-template').html();
        this.counter = 0;
       // this.$commentTemplate = $('#comment-template').html();
    }
    showNextPet(){
        
    }
    renderPets(pets) {
        if (pets.length == 0 || this.counter == pets.length){
            this.$pets.empty();
            this.counter = 0;
           return console.log("empty array")
        }
        else {
        this.$pets.empty();
        var template = Handlebars.compile(this.$petTemplate);
          var newHTML = template(pets[this.counter]);
          this.$pets.append(newHTML);
          this.counter = this.counter+1;
          console.log(this.counter);
          console.log(pets.length);
    }
    }

    renderError(error){
        $(".error").html(error);
        
    }

    swipePetRight(){
        $(".fly").addClass('magictime bombRightOut');
    }

    swipePetLeft(){
        $(".fly").addClass('magictime bombLeftOut');
    }
}

export default PetsRenderer
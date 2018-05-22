class EventsHandler {
    constructor(petsRepository, petsRenderer, favorites) {
        this.petsRepository = petsRepository;
        this.petsRenderer = petsRenderer;
        this.$pets = $(".pets");
        this.$addaptForm =$(".pet-form");
        this.favorites = favorites;
    }

    registerAddPet() {
        $('#addpet').on('click', () => {
            if ( $("#name").val()===null ||
            $("#gender").val()===null ||
            $("#breed").val()===null||
             $("#color").val()===null||
             $("#size").val()===null ||
             $("#age").val()===null ||
             $("#mail").val()===null ||
             $("#img").val()===null ) {
                 alert("Please fill out all fields")
             }
            else{
            let obj = {name: $("#name").val(), gender: $("#gender").val(),breed: $("#breed").val(),color: $("#color").val(),size: $("#size").val(),age: $("#age").val(),mail: $("#mail").val(),img: $("#img").val(),addpet : "no"};
            $("#name").val('');
            $("#gender").val('');
            $("#breed").val('');
            $("#color").val('');
            $("#size").val('');
            $("#age").val('');
            $("#mail").val('');
            $("#img").val('');
            this.petsRepository.addPet(obj).then(()=>{this.petsRenderer.renderPets(this.petsRepository.pets)});
            }
        })
        }
       

        registerLikePet() {
            
            $('.pets').on('click',  '#like',() => {
                    console.log('like');
                    $(".fly").addClass('magictime bombRightOut');
                    event.preventDefault();
                var id = $(".pets").find(".show-pet").attr("data-id");
                setTimeout(()=>{this.favorites.addFavorite(id).then(()=>{this.favorites.renderFavorite()})}, 1000);
                
                setTimeout(()=>{ this.petsRenderer.renderPets(this.petsRepository.pets) }, 1000); 
               
                })
            }
            registerUnlikePet() {

                $('.pets').on('click','#unlike', () => {
                    $(".fly").addClass('magictime bombLeftOut');
                    console.log('unlike');
                    event.preventDefault();
                    //function do not show

                    //function show next
                    // this.petsRepository.counter++;
                    setTimeout(()=>{ this.petsRenderer.renderPets(this.petsRepository.pets) }, 500);
                    
                   
                    })
                } 
                
                registerAdopt() {
                    

                    $('.pets').on('click','#adopt', () => {
                        console.log('adopted');
                        //function send a mail to the person + tag as adopted
    
                        })
                    }

                   
                
            // makes the form toggle
            registerToggleForm() {
               

                $('#addNewPet').on('click', (event) => {
                    $('.pet-form').toggleClass('show');
                    event.preventDefault();
                  });
            }
            registerTogglfavorites() {
                $('.view-favorites').on('click','.font', (event) => {
                    $('.view-favorites').unbind("mouseenter mouseleave");
                    $('.favorites').toggleClass('appear');
                    event.preventDefault();
                  });
            }
}

export default EventsHandler
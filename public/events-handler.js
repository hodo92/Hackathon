class EventsHandler {
    constructor(petsRepository, petsRenderer, favorites) {
        this.petsRepository = petsRepository;
        this.petsRenderer = petsRenderer;
        this.$pets = $(".pets");
        this.$addaptForm = $(".pet-form");
        this.favorites = favorites;
    }
    formValidate() {
        if ($("#name").val() === null ||
            $("#gender").val() === null ||
            $("#breed").val() === null ||
            $("#color").val() === null ||
            $("#size").val() === null ||
            $("#age").val() === null ||
            $("#mail").val() === null ||
            $("#img").val() === null)

            return true ; 
    }

    registerAddPet() {
        $('#addpet').on('click', () => {
            if (formValidate()) {
                this.petsRenderer.renderError("Please fill out all fields")
            }
            else {
                let obj = { name: $("#name").val(), gender: $("#gender").val(), breed: $("#breed").val(), color: $("#color").val(), size: $("#size").val(), age: $("#age").val(), mail: $("#mail").val(), img: $("#img").val(), addpet: "no" };
                this.petsRepository.addPet(obj).then(
                    () => {
                        this.emptyInputs();
                        this.petsRenderer.renderPets(this.petsRepository.pets);
                    });
            }
        })
    }
    emptyInputs() {
        $("#name").val('');
        $("#gender").val('');
        $("#breed").val('');
        $("#color").val('');
        $("#size").val('');
        $("#age").val('');
        $("#mail").val('');
        $("#img").val('');
    }

    registerLikePet() {

        $('.pets').on('click', '#like', () => {
            event.preventDefault();
            console.log('like');


            var id = $(".pets").find(".show-pet").attr("data-id");
            this.favorites.addFavorite(id).then(() => {
                this.petsRenderer.swipePetRight();
                setTimeout(() => {

                    this.favorites.renderFavorite();
                    this.petsRenderer.renderPets(this.petsRepository.pets)
                }, 1000)
            });

        })
    }
    registerUnlikePet() {

        $('.pets').on('click', '#unlike', () => {
            console.log('unlike');
            event.preventDefault();
            this.petsRenderer.swipePetLeft();
            setTimeout(() => {
                this.petsRenderer.renderPets(this.petsRepository.pets)
            }, 500);
        })
    }

    registerAdopt() {


        $('.pets').on('click', '#adopt', () => {
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
        $('.view-favorites').on('click', '.font', (event) => {
            $('.view-favorites').unbind("mouseenter mouseleave");
            $('.favorites').toggleClass('appear');
            event.preventDefault();
        });
    }
}

export default EventsHandler
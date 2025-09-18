var gear_categories = {
            lens: "Lens",
            camera: "Camera",
            bag: "Bag",
            accessory: "Accessory",
        }

var app = new Vue({
    el: "#app",

    data : {

        activeCategoryFilter: "",

        gear: [
            {
                img: "",
                name: "Olympus Trip 35",
                brand: "Olympus",
                price: "200",
                category: gear_categories.camera,
                purchase_date: "16 June 2025",
                desc: "",
                images_link: "https://www.lomography.com/homes/rpn/cameras/3314982-olympus-trip-35/photos"
            },
            {
                img: "",
                name: "Digitaliza+",
                brand: "Lomography",
                price: "115",
                category: gear_categories.accessory,
                purchase_date: "22 July 2025",
                desc: "My 35mm film carrier for home scanning. Simple, cheap, and does everything I need (including sprocket hole scanning).",
                images_link: "https://www.lomography.com/homes/rpn/cameras/3314982-olympus-trip-35/photos"
            },
            {
                img: "",
                name: "Nikon D5300",
                brand: "Nikon",
                price: "400",
                category: gear_categories.camera,
                purchase_date: "2 July 2025",
                desc: "Originally purchased to scan 35mm film. It was the cheapest 24mp camera on the market. One popped up on facebook marketplace and I grabbed it immediately due to it's like-new condition. I also justified the purchase by convincing myself that I could use it for normal digital photography. Unfortunately, this camera was SO GOOD that it made me go nuts for photography. It has amazing color science, dynamic range, and features for its price/age. I still use it with the 70-300mm when I have the 24-105mm on the R6M2.",
                images_link: "https://www.lomography.com/homes/rpn/cameras/3352134-nikon-d5300/photos"
            },
            {
                img: "",
                name: "Nikon AF-P DX NIKKOR 18-55mm f/3.5-5.6G VR II Lens",
                brand: "Nikon",
                price: "0",
                category: gear_categories.lens,
                purchase_date: "",
                desc: "The kit lens that came with the camera kit. It is the newer AF-P version that has much quicker auto-focus. The linked images are incorrectly labelled as AF-S",
                images_link: "https://www.lomography.com/homes/rpn/lenses/3733-nikon-af-s-dx-nikkor-18-55mm-f-3-5-5-6g-vr-ii-lens/photos"
            },
            {
                img: "",
                name: "Nikon AF-P DX NIKKOR 70-300mm f/4.5-6.3 G ED VR",
                brand: "Nikon",
                price: "330",
                category: gear_categories.lens,
                purchase_date: "",
                desc: "Also a kit lens, but I purchased this separately on eBay. This came in mint condition from Japan. I wanted telephoto so I could capture framing and compression that my phone could not. That sweet sweet compression. It also makes candid portraiture less invasive by capturing moments while being just a few feet farther away.",
                images_link: "https://www.lomography.com/homes/rpn/lenses/20104-nikon-af-p-dx-nikkor-70-300mm-f-4-5-6-3-g-ed-vr/photos"
            },
            {
                img: "",
                name: "Nikon AF-D Micro NIKKOR 60mm f/2.8",
                brand: "Nikon",
                price: "120",
                category: gear_categories.lens,
                purchase_date: "",
                desc: "Purchased to scan 35mm film at home with the Digitaliza+ on the D5300 (Manually Focused)",
                images_link: "https://www.lomography.com/homes/rpn/lenses/20331-nikon-af-nikkor-60mm-f-2-8/photos"
            },
            {
                img: "",
                name: "Canon R6 Mark II",
                brand: "Canon",
                price: "3050",
                category: gear_categories.camera,
                purchase_date: "21 August 2025",
                desc: "",
                images_link: "https://www.lomography.com/homes/rpn/cameras/3366741-canon-eos-r6-mark-ll/photos"
            },
            {
                img: "",
                name: "Canon RF 24-105mm f/4 L IS USM ",
                brand: "Canon",
                price: "1890",
                category: gear_categories.lens,
                purchase_date: "20 August 2025",
                desc: "",
                images_link: "https://www.lomography.com/homes/rpn/lenses/20365-canon-rf-24-105mm-f-4-l-usm/photos"
            },
            {
                img: "",
                name: "Canon RF 200-800mm f/6.3-9 IS USM",
                brand: "Canon",
                price: "2625",
                category: gear_categories.lens,
                purchase_date: "20 August 2025",
                desc: "",
                images_link: "https://www.lomography.com/homes/rpn/lenses/20339-canon-rf-200-800mm-f-6-3-9-is-usm/photos"
            },
            {
                img: "",
                name: "Tripod OPTH155",
                brand: "Optex",
                price: "40",
                category: gear_categories.accessory,
                purchase_date: "",
                desc: "Originally purchased to scan 35mm film at home. Used with D5300, 60mm Micro, and Digitaliza+",
                images_link: ""
            },
            {
                img: "",
                name: "PGYTECH Shoulder Strap",
                brand: "PGYTECH",
                price: "72",
                category: gear_categories.accessory,
                purchase_date: "24 August 2025",
                desc: "With the addition of another camera and heavy duty telephoto lens, I thought it best to invest in a quick release strap system.",
                images_link: ""
            },
            {
                img: "",
                name: "VKO Shoulder Strap",
                brand: "VKO (Amazon random)",
                price: "15",
                category: gear_categories.accessory,
                purchase_date: "3 July 2025",
                desc: "Nice rope-like camera ~strap~ for the film camera. Simple, sleek, love it.",
                images_link: ""
            },
            {
                img: "",
                name: "Concept Large Hardshell Camera Backpack",
                brand: "K&F",
                price: "89",
                category: gear_categories.bag,
                purchase_date: "24 August 2025",
                desc: "(Med+ 22L). Needed more carrying capacity after adding the Canon mirrorless systems. Wanted to have a dedicated bag to store all the lenses and bodies when moving or going for a multi-purpose shoot.",
                images_link: ""
            },
            {
                img: "",
                name: "Camera Sling Bag/Backpack",
                brand: "Toribio",
                price: "",
                category: gear_categories.bag,
                purchase_date: "15 July 2025",
                desc: "(Med 15L). Purchased to go along with the D5300. I wanted a bag that could store and provide quick access to the D5300 and film camera. The separate pouch on top positioned this as an everyday carry for traveling. Straps can be combined into one, making it a sling. This was very useful!",
                images_link: ""
            },
            {
                img: "",
                name: "Camera Sling Bag",
                brand: "Skysper",
                price: "39",
                category: gear_categories.bag,
                purchase_date: "3 July 2025",
                desc: "(Small). First camera bag. Used to carry my film camera, film, cleaning gear, and snacks. VERY good quality and I bring it traveling for light outings and nights!",
                images_link: ""
            },
        ]
    },


    methods: {
        showpage(id){
            $(".content-page").hide()
            $(id).show()

        },

        write(){
            console.log(this.filteredGear)
        }
    },

    mounted() {

    },

    created() {

    },

    computed: {
        filteredGear: function(){
            if(!this.activeCategoryFilter){
                return this.gear
            }
            return this.gear.filter(object => {
                console.log(object)
                return object.category.toLowerCase() === this.activeCategoryFilter.toLowerCase()
            });

        }
    }

});

$(document).ready(function(){
    $(".nav-item").click(function(){
        $(".nav-item").removeClass("active")
        $(this).addClass("active")
    })

    $(".category-filter").click(function(){
        $(".category-filter").removeClass("active")
        $(this).addClass("active")
    })
});

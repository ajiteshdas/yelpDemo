var mongoose = require('mongoose'),
    Campground = require('./models/campground')
Comment = require('./models/comment');

var seeds = [
    {
        name: "Cloud's Rest",
        image: "https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&qˀ=80",
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit debitis illum, sunt suscipit delectus in nobis quis officiis. Corrupti ex rerum natus reiciendis pariatur vel nobis libero doloribus sapiente, illo obcaecati nesciunt facilis voluptatem dolore, a quae numquam eum iste necessitatibus. Doloremque aliquid commodi quidem autem atque necessitatibus esse debitis harum ullam praesentium vero suscipit sunt enim expedita assumenda libero omnis sapiente animi quibusdam quia voluptatum, repellendus accusamus odio quas. Veritatis maxime aliquam odio error nulla, corrupti reiciendis. Tempora excepturi, minus, laboriosam saepe nobis eos iure eligendi ipsum quos ipsam earum, nesciunt aspernatur! Temporibus incidunt minus earum fugit perspiciatis eos deserunt ullam laboriosam nihil, dolorem quis magnam architecto, libero hic, soluta aspernatur sint delectus ab porro debitis repellat deleniti tenetur. Soluta, provident placeat sit similique eaque accusantium! Ad praesentium ratione odit fugit illo, iure minus repellendus dignissimos enim voluptas deleniti eum cumque ea quaerat pariatur magni! Ex quaerat iste, ducimus cumque odio molestiae labore necessitatibus suscipit est, ratione debitis, vitae incidunt ipsa laboriosam soluta sint quis architecto culpa! Perspiciatis autem iure amet magni vitae tempora ex ratione, illum assumenda quos tenetur qui modi et natus necessitatibus suscipit. Quo tempora illum voluptate exercitationem vero, facere minima atque? Repellendus molestias saepe maiores!'
    },
    {
        name: "Granite Hill",
        image: "https://images.unsplash.com/photo-1475564481606-0f9f5d97c047?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit debitis illum, sunt suscipit delectus in nobis quis officiis. Corrupti ex rerum natus reiciendis pariatur vel nobis libero doloribus sapiente, illo obcaecati nesciunt facilis voluptatem dolore, a quae numquam eum iste necessitatibus. Doloremque aliquid commodi quidem autem atque necessitatibus esse debitis harum ullam praesentium vero suscipit sunt enim expedita assumenda libero omnis sapiente animi quibusdam quia voluptatum, repellendus accusamus odio quas. Veritatis maxime aliquam odio error nulla, corrupti reiciendis. Tempora excepturi, minus, laboriosam saepe nobis eos iure eligendi ipsum quos ipsam earum, nesciunt aspernatur! Temporibus incidunt minus earum fugit perspiciatis eos deserunt ullam laboriosam nihil, dolorem quis magnam architecto, libero hic, soluta aspernatur sint delectus ab porro debitis repellat deleniti tenetur. Soluta, provident placeat sit similique eaque accusantium! Ad praesentium ratione odit fugit illo, iure minus repellendus dignissimos enim voluptas deleniti eum cumque ea quaerat pariatur magni! Ex quaerat iste, ducimus cumque odio molestiae labore necessitatibus suscipit est, ratione debitis, vitae incidunt ipsa laboriosam soluta sint quis architecto culpa! Perspiciatis autem iure amet magni vitae tempora ex ratione, illum assumenda quos tenetur qui modi et natus necessitatibus suscipit. Quo tempora illum voluptate exercitationem vero, facere minima atque? Repellendus molestias saepe maiores!'
    },
    {
        name: "Sheltered Rest",
        image: "https://images.unsplash.com/photo-1464547323744-4edd0cd0c746?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit debitis illum, sunt suscipit delectus in nobis quis officiis. Corrupti ex rerum natus reiciendis pariatur vel nobis libero doloribus sapiente, illo obcaecati nesciunt facilis voluptatem dolore, a quae numquam eum iste necessitatibus. Doloremque aliquid commodi quidem autem atque necessitatibus esse debitis harum ullam praesentium vero suscipit sunt enim expedita assumenda libero omnis sapiente animi quibusdam quia voluptatum, repellendus accusamus odio quas. Veritatis maxime aliquam odio error nulla, corrupti reiciendis. Tempora excepturi, minus, laboriosam saepe nobis eos iure eligendi ipsum quos ipsam earum, nesciunt aspernatur! Temporibus incidunt minus earum fugit perspiciatis eos deserunt ullam laboriosam nihil, dolorem quis magnam architecto, libero hic, soluta aspernatur sint delectus ab porro debitis repellat deleniti tenetur. Soluta, provident placeat sit similique eaque accusantium! Ad praesentium ratione odit fugit illo, iure minus repellendus dignissimos enim voluptas deleniti eum cumque ea quaerat pariatur magni! Ex quaerat iste, ducimus cumque odio molestiae labore necessitatibus suscipit est, ratione debitis, vitae incidunt ipsa laboriosam soluta sint quis architecto culpa! Perspiciatis autem iure amet magni vitae tempora ex ratione, illum assumenda quos tenetur qui modi et natus necessitatibus suscipit. Quo tempora illum voluptate exercitationem vero, facere minima atque? Repellendus molestias saepe maiores!'
    }
];

async function seedDB() {
    try {

        // Remove all campgrounds and comments
        await Comment.deleteMany({});
        console.log('commments removed');
        await Campground.deleteMany({});
        console.log('Campgorunds removed');

        //Seeding from the seeds array
        for (const seed of seeds) {
            //return object from data queries for both campgrounds (let campground) and comments (let comment)
            let campground = await Campground.create(seed);
            let comment = await Comment.create(
                {
                    text: "Nori grape silver beet broccoli kombu beet greens fava bean potato quandong celery. Bunya nuts black-eyed pea prairie turnip leek lentil turnip greens parsnip. Sea lettuce lettuce water chestnut eggplant winter purslane fennel azuki bean earthnut pea sierra leone bologi leek soko chicory celtuce parsley jícama salsify. ",
                    author: "Homer"
                });
            //push comment to campground's comments property defined in the model
            console.log('comments created');
            campground.comments.push(comment);
            console.log('comments added to campground');
            campground.save();
        }

    } catch (error) {
        console.log(error);
    }
}

module.exports = seedDB;


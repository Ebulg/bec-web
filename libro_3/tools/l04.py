from h import *
jobs=[["l04-shopping",18,[240,276,580,662]],["l04-chart",18,[100,676,700,1050],[],{"keepLines":True}],
["l04-grocer",21,[40,388,800,836],[],{"keepLines":True}],["l04-cake",21,[50,852,346,1060],[],{"keepLines":True}],
["l04-angie",22,[210,76,616,412],[],{"keepLines":True}],["l04-steps",22,[96,534,724,860],[],{"keepLines":True}]]
P=[
pg([17,18], lesson(4,"Four","Fourth (4th)"), part("I","Supermarkets"),
 p("When we go shopping for food for the family we can find everything we need in a supermarket. There, we serve ourselves, loading groceries from the shelves into a push cart, pushing it up and down the aisles."),
 p("The supermarket has an amazing variety of food to select from, such as fresh fruits and vegetables, fish, dairy products, flour, sugar, rice, a large bakery section, meat of all kinds, food for pets, candies, spices, cereals, canned food and a large section of packed frozen foods. Besides food, the supermarket sells cleaning powders and soaps of all kinds, paper, napkins and towels and many household items."),
 p("Many foods are completely prepared. These are frozen pizza pies, canned or frozen stews, spaghetti and meat or macaroni and cheese dinners, all pre-cooked. The famous «T.V. Dinners» are very popular because they are cooked while the family is supposedly watching T.V. and will continue watching T.V. as they eat right from the aluminum cooking trays."),
 img("l04-shopping","300px")),
pg([18,19], img("l04-chart","380px"), h("Answer:"),
 wb("Where can we find everything when shopping for food?","Name some of the foods we can get at supermarkets?","Besides food, what other things can we get at supermarkets?","Name some of the foods that are completely prepared.","What is a «TV dinner»?", rg="6px")),
pg([19,20], h("Expressions of Quantity for Shopping"),
 table([["a container / half a pint","OF heavy cream"],["a quart / half a gallon / a gallon","OF milk, orange juice, etc."],["a pound, five pounds","OF flour, sugar, coffee, apples, potatoes, onions"],["a box","OF detergent, dog food, spaghetti, cookies, crackers, toothpicks, tissues"],["a can","OF soup, tuna"],["a package","OF frozen peas, sponges, paper plates"],["a package / a carton","OF cigarettes"],["a roll","OF paper towels, toilet paper, waxed paper"],["a loaf","OF bread"],["a head","OF lettuce, cabbage, garlic"],["a bunch","OF carrots, parsley, celery, radishes"],["an ear","OF corn"],["a dozen","— eggs, rolls."]], colsW="230px minmax(0,1fr)")),
pg([20,21], part("II","At the Grocer’s"),
 dlg("– Good morning, Mr. Jenkins.","– Well, hello Angie. What can I do for you today?","– I want to bake a cake for my mother. It’s her birthday tomorrow. I need some ingredients.","– What do you need?","– I need some sugar.","– How much do you need?","– Ummm… a pound will do and, I also want a dozen brown eggs. Please, be sure there aren’t any bad ones. Otherwise, I’ll bring them back.","– Of course, we sell only fresh food here. What else do you want?","– I hardly have any flour. Please, give me some self-raising flour and half a gallon of milk.","– Yes. How much flour do you want?","– Two pounds and er… a pound of butter as well. Oh!, I also need a large bar of semi-sweet chocolate.","– We have a special sale on this new brand of butter. It’s only $1.75.","– All right, I’ll try it out. Do you have any oranges? If they are firm and ripe, I’d like to take some for juice. How much do they cost?","– Oranges are three for 62 cents.","– I’ll get half a dozen, then … O.K. … I guess that’s all. How much is everything, Mr. Jenkins?","– Let’s see. That’s $7.25.","– Here you are. Thank you very much, Mr. Jenkins.","– Bye, Angie. Wish your mother a happy birthday.")),
pg(21, img("l04-grocer","470px"), img("l04-cake","220px")),
pg(22, img("l04-angie","300px"), inst("Label the arrowed objects. Choose from the following list of words:"),
 note("Mixer, egg yolk, hot water, melted chocolate, oven, sugar, egg white, chocolate, sieve, basin, stove, pan, baking tin, egg, mixture, butter."),
 img("l04-steps","350px")),
pg([22,23], part("III","Function: Offer food and drink."),
 wb("Why don’t you join us for dinner?","Would you like another piece of cake?","Would you like a cup of coffee?","How about going out for some chinese food?","How about some hamburgers?","Would you care for some fried chicken?","Let’s have something to drink.", num=False, rg="6px")),
pg([23,24], h("Answer:"), wb("Why was Angie at the grocer’s?","Did she need any sugar?","How much did she want?","How many eggs did she want?","How much milk did she want?","What kind of chocolate did she want?","How much was the butter?","How much were the oranges?","How much was for everything?", rg="4px"),
 h("Ingredients for a Chocolate Cake"),
 {"t":"olist","num":False,"cols":2,"items":["– 150 g self rising flour","– 25 g semi-sweet chocolate","– 1 teaspoon baking powder","– Pinch of salt","– 150 g soft butter","– 150 g sugar","– 3 large eggs","– 1 cup of milk"]}),
]
save("l04","Lesson Four",P,jobs)

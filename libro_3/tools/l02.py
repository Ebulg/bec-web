from h import *
jobs=[["l02-camp",7,[20,160,800,808]],["l02-trip",9,[28,404,806,742]]]
P=[
pg([6,7], lesson(2,"Two","Second (2nd)"), part("I","Camping"),
 p("Most working Americans count on two weeks of vacation time. For millions of Americans, vacation means «hitting the open road» to see as many of the wonders of their country as they can, to visit places of historical interest and scenic beauty. Vacation trips often span the country. You can cross the continent in a week of steady driving; a train takes three days and a plane four hours."),
 p("Camping as a family vacation has suddenly become extremely popular in America. It is a cheap way to travel and it can be enjoyed by people of all ages. The sale of camping equipment has become a big business."),
 p("Tents, sleeping bags, inflatable mattresses, cooking pans and eating utensils, ice chests and a lot of other appliances are loaded in car trunks or racks on top of cars."),
 p("In the camping grounds there are clear spaces near a picnic area. Tables and benches, a fireplace, firewood and water are available. Some campers pitch-up their tents and settle down for the whole of their vacations others prefer to move camp after a night or two to cover more territory. National Parks allow campers to stay for only 15 days. One thing which can spoil your stay in these parks is poison ivy, a wild plant which can cause you painful rash if you’re not careful.")),
pg(7, img("l02-camp","560px"), h("Answer the questions:"), wb("Why is camping so popular in America?","What do you need when camping?","Where can you camp for up to 15 days?", rg="6px")),
pg(8, wb("Why must we be careful with poison ivy?","Describe a camping area.","Where can you camp in your country?","Have you ever gone camping?","Name 5 places of historic interest for Venezuelans.","Name 5 places of scenic beauty in Venezuela.","Where would you like to spend your next vacation? Why?", start=4, rg="6px")),
pg([8,9], part("II","Plans for the Week-end"),
 p("Ted Wilkinds and his wife Jill are at the bar in the club. They are talking with Dave and Joan Green. They’re making plans for the week-end."),
 h("Ted is ordering the drinks"),
 dlg("*Ted:* Waiter please! A scotch with soda, bourbon on the rocks, rum and coke, and a glass of white wine.","*Dave:* Here we are; ready for some fun. It’s Friday night.","*Ted:* That’s right, we’ve worked very hard this week. I’m all tired out! I think we should go away for the week-end.","*Jill:* That’s a great idea! Where should we go? Any suggestions?","*Dave:* Why don’t we go to the mountains? My brother has a log-cabin we can use.","*Joan:* Sure, you’ll love it!, There’s a small lake nearby. We can go swimming while the men are fishing.","*Jill:* They will have to catch some fish, otherwise they won’t eat.","*Ted:* I’ve never gone fishing before, but Dave is a skillful fisherman.","*Dave:* I hope to be lucky or we might have no dinner.","*Joan:* We will have a very nice week-end. You’ll enjoy the silent soft wind during the night.","*Jill:* I’m sure it’s going to be a fantastic experience to be in touch with the natural environment. We’ll be in the middle of a wonderful scenery with trees, water, wild animals, etc…","*Joan:* You can’t really imagine how it is. Just wait until you are there. You’ll be unwilling to come back to civilization after you are in touch with the wonders of nature.","*Ted:* O.K., let’s get ready for the trip.")),
pg(9, img("l02-trip","320px"), inst("Here we have some items you’ll need for camping. Say what you need each one for:"),
 wi("Cooking pans:","Sleeping bag:","Matches:","Knife:","Gas Lamp:","Tent:", qw="150px")),
pg(10, part("III","Complete the following dialogues:"),
 {"t":"write","num":False,"rowGap":"8px","qw":"40px","items":[{"q":"*1) a)* Are you going to the swimming pool next Sunday?","noLine":True},{"q":"b)"},{"q":"a) What are you going to do?","noLine":True},{"q":"b)"},
  {"q":"*2) a)* Are you busy tonight?","noLine":True},{"q":"b)"},{"q":"a) Where do you want to go dancing tonight?","noLine":True},{"q":"b)"},
  {"q":"*3) a)*"},{"q":"b) I’m going to the theater with Peter.","noLine":True},{"q":"a)"},{"q":"b) We only have two tickets.","noLine":True},
  {"q":"*4) a)*"},{"q":"b) No, I’m not. I’m watching T.V.","noLine":True},{"q":"a)"},{"q":"b) You can come in half an hour.","noLine":True}]}),
pg([10,11], h("Functions:"), inst("1.– Accepting Invitations:"),
 dlg("*A:* Would you like to go the movie tonight?","*B:* That sounds wonderful!","*A:* I’ll pick you up at … Is 7:00 all right?","*B:* Yes, that would be O.K.","*A:* See you later.","*B:* I’ll be expecting you. Thanks for calling."),
 note("*Exercise:* Write a dialogue (Inviting and accepting)."), lines(4),
 inst("2.– Declining Invitations:"),
 dlg("*A:* Do you want to go to the beach tomorrow?","*B:* I wish I could, but I already have plans.","*A:* Maybe, we can go together next week-end.","*B:* I’d really like to, but I have to baby-sit next Saturday.","*A:* Really?","*B:* Yes, but I’d love to go with you some other time."),
 note("*Exercise:* Write a dialogue (Inviting and declining)."), lines(4)),
]
save("l02","Lesson Two",P,jobs)

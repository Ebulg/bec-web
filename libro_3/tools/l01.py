from h import *
jobs=[["l01-plane",1,[150,676,690,1068]],["l01-airport",3,[100,430,800,712]],["l01-arr1",3,[40,722,398,1062]],["l01-arr2",3,[404,722,796,1062]],
["l01-card",5,[36,126,790,648],[],{"keepLines":True}],["l01-formal",5,[95,748,730,1030],[],{"keepLines":True}],["l01-informal",6,[90,160,735,385],[],{"keepLines":True}]]
P=[
pg(1, lesson(1,"One","First (1st)"), part("I","A Business Trip"),
 p("My name is Tom Kelly. I’m 31 years old. I’m an engineer. I work in World Systems Corporation. I’m traveling to Caracas for the opening of the new branch office. Sitting beside me is Mr. Clark Stevens, The President of the Company."),
 p("My wife Betty and our children Ken and Sue are in New York. They will come to Venezuela in June, when the kids finish school."),
 p("My friends Fred Murray and Alan James are working in Caracas. They made all the arrangements for the opening. It was very hard work, but fortunately it is now finished. Everything is ready for tomorrow. It will be a very important event. There will be a lunch after the ceremony. We invited a lot of people. We expect to see old friends, suppliers and customers."),
 p("The flight is coming to an end. We’re going to land in Simón Bolívar International Airport, Maiquetía. It’s 6:30 p.m. My assistant is waiting for us. He will take us to the hotel in Caracas."),
 img("l01-plane","360px")),
pg(2, h("Answer:"), wb("What’s the engineer’s name?","How old is he?","Where does he work?","What’s his wife’s name?","How many children do they have?","Who is Mr. Clark Stevens?","How did Mr. Kelly and Mr. Stevens travel?","When is the branch office opening?","Who is waiting for them?","Where is he going to take them?", rg="6px")),
pg([2,3], part("II","At the Airport"),
 dlg("*Mr. Murray:* Welcome to Venezuela.","*Mr. Kelly:* Hi, Fred. Good to see you. I’d like to introduce you to Mr. Clark Stevens, the President of the Corporation.","*Mr. Stevens:* How do you do, Mr. Murray?","*Mr. Murray:* How do you do? It’s a pleasure to have you here. I was looking forward to meet you. Did you have a nice trip?","*Mr. Stevens:* Yes, it wasn’t bad, you know.","*Mr. Kelly:* We had a little turbulence. Nothing serious. How’s everything Fred?","*Mr. Murray:* Pretty good.","*Mr. Kelly:* How are Nancy and the kids?","*Mr. Murray:* Fine, Nancy just got a job and Billy and Kathy are finishing school… Let me take your bags. I parked my car near here.","*Mr. Kelly:* O.K. Let’s go."),
 img("l01-airport","190px"),
 {"t":"figs","items":[{"img":"img/v/l01-arr1.svg","cap":"","h":"230px","w":"330px"},{"img":"img/v/l01-arr2.svg","cap":"","h":"230px","w":"330px"}]}),
pg(4, h("Personal Information"), wb("What’s your full name?","When were you born?","Where were you born?","How old are you?","Do you work or study?","Where do you live?","Are you married or single?","Do you have any children?","Do you have a car?","How do you come to class?", rg="6px")),
pg(5, h("Fill out the following card."), img("l01-card","560px")),
pg([5,6], part("III","Formal Introductions"), img("l01-formal","270px"), h("Informal Introductions"), img("l01-informal","220px")),
]
save("l01","Lesson One",P,jobs)

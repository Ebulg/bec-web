from h import *
jobs=[["l12-doctor",59,[190,470,600,876]],["l12-office",62,[20,64,808,476],[[20,416,140,446]]]]
P=[
pg(59, lesson(12,"Twelve","Twelfth (12th)"), part("I","Doctors’ Warning: «Stop Smoking or Else»…"),
 p("If you’re really serious about getting fit, with all the benefits that it brings, there is one thing you will have to give up: Smoking."),
 p("There’s no painless or effortless way to stop smoking, but linking it to your efforts to keep fit gives you a positive excuse to kick the habit once and for all."),
 p("Few smokers who quit on a sudden impulse ever succeed. A similar impulse occurs and they start smoking again. Usually, to be successful, a really conscious effort is needed, in the time for that conscious effort. Now with good health as your goal."),
 img("l12-doctor","370px"),
 h("Remember:"),
 dlg("* Cigarettes are dangerous. Medical research has proved it.","* Smoking reduces your ability to do vigorous exercise.","* Cigarettes cause bronchitis and increase the risk of coronary heart disease and emphysema.","* Cigarettes may complicate pregnancy.")),
pg(60, inst("Draw up a ‘stop smoking action plan’ to run alongside your efforts to get fit."), lines(5),
 h("Underline the word in parenthesis which completes the meaning of the sentence."),
 ol("If you want to get and keep fit, you should not (run – eat – sweat – smoke).","When you give up doing something, you (stop – start – continue – sweat – smoke) doing it.","Women are advised not to smoke because medical research has found that cigarettes may cause (pain – pleasure – harm – bronchitis) to the fetus.","For most smokers, to stop smoking is not (easy – hard – dangerous – healthy)."),
 h("Give your own answer."),
 wb("Do you smoke?","Would you like your children to smoke?","Why is it necessary to stop smoking if you want to keep fit?","Are you in favor of or against cigarette advertising on television? Why?","Will you allow other people to smoke when they are near you? Give reasons to support your answer.", rg="2px")),
pg(61, part("II","Do You Mind if I Smoke?"),
 dlg("*Peggy:* It’s twelve thirty. It’s time to go to lunch.","*Jane:* Yes. Let’s stop working and go to the cafeteria downstairs.","*Peggy:* What would you like to eat?","*Jane:* I only want a plain hamburger. I really shouldn’t eat too much.","*Peggy:* Are you on a diet?","*Jane:* No, I just want to be a little careful. By the way, I have to ask you something.","*Peggy:* What is it?","*Jane:* Are you going to smoke?","*Peggy:* Why do you ask?","*Jane:* Well, I couldn’t sit with a person who smokes. I’m sorry, but I just couldn’t.","*Peggy:* What’s the matter with you? Oh, I see. You must’ve given up smoking! Is that it?","*Jane:* Yes, I haven’t smoked for a week.","*Peggy:* Well, good for you! Smoking is really harmful for your health. I think I’ll try to give it up too.","*Jane:* There’s only one way to give it up and that’s just stop.","*Peggy:* Yes, you’re right. But can I have at least one last cigarette?","*Jane:* Oh, no. If you don’t do it now, you never will.","*Peggy:* All right. Let’s go. I hope there aren’t going to be a lot of people smoking in the cafeteria.","*Jane:* We shouldn’t sit near the smokers. That’s all.")),
pg(62, img("l12-office","300px"),
 part("III","Composition Exercise"), inst("Write a dialogue between a habitual drinker and his wife, each one defending his point of view. (See function below)"), lines(5),
 h("Function: Arguing"),
 {"t":"olist","num":False,"cols":2,"items":["*a)* I insist…","*b)* There’s no doubt that…","*c)* Sorry, but…","*d)* You may have a point, but…","*e)* Don’t be silly.. I can’t accept…","*f)* That’s nonsense…","*g)* I can’t possibly agree with you","*h)* I really can’t agree with you, are you crazy?","*i)* You’ve got to be kidding.","*j)* You can’t be serious…","*k)* Come on, that’s ridiculous."]}),
]
save("l12","Lesson Twelve",P,jobs)
sec=lambda n,t: f"*Section {n}:* {t}"
jobs=[["l13-bank",63,[100,530,720,1068]],["l13-form",65,[100,412,736,1048],[],{"keepLines":True,"S":3.5,"blur":0.6,"minArea":3}],["l13-dentist",66,[100,80,756,456]]]
P=[
pg(63, lesson(13,"Thirteen","Thirteenth (13th)"), part("I","How to Get a Social Security Card"),
 p("To get a Social Security card, you must fill out a form. You get this form at a Social Security Administration Office. To find out where the office closest to you is located, you can look under S in the white pages of your phone book."),
 p("When you get a form, you will also get directions telling you how to fill it out. You should read all the directions carefully before you begin. If you have any questions, you can call the Social Security office."),
 p("Look at the Social Security Application. You will be filling out this form by following these directions. Before you begin, there are two things you should know. First, if you do not know the answer to a question, write unknown in the space. Second, print your answers using a pen with dark blue or black ink."),
 img("l13-bank","460px")),
pg(64, h("Instructions:"),
 dlg(sec(1,"Print your name on the first line. If your name is different now than when you were born, print the full name you were given at birth on the second line of the section. The third line is for any name you have used other than the two you have already given. Do not put nicknames on this line."),
  sec(2,"Print the address where you want the number card to be sent."), sec(3,"Check ( ) the box that describes you."), sec(4,"Check one box."),
  sec(5,"Check the box that describes you. Notice the word *voluntary* at the top of this section. Voluntary means you do not have to fill in this section if you don’t want."),
  sec(6,"Fill in the month, day and year on which you were born. This should all be done with numbers."), sec(7,"Fill in the age you are today."),
  sec(8,"In the first box, print the name of the city where you were born and the name of the state where you were born in the box next to that. If you were not born in the United States, give the name of the country where you were born. Write whole words, not shortened forms."),
  sec(9,"Print the full name your mother was given at her birth on the line of section. On the second line, fill in your father’s full name."),
  sec(10,"If you were to fill out this form to get a new card because you lost yours or changed your name, you would check the box next to *Yes*, then you must fill in the rest of Section 10. If you marked *No*, then you go on the Section 11."),
  sec(11,"Fill in today’s date."), sec(12,"Fill in a phone number where you could be reached if the people of the Social Security office needed to speak to you."), sec(13,"Sign your name the way you usually write it."),
  sec(14,"If you have filled this form out for yourself, check the box next to *self*. If you have filled it out for someone else, mark the box next to *other*, and specify how are related to the person you have filled out the form for."))),
pg(65, h("Form SS-5 — Application for a Social Security Number Card"), img("l13-form","880px")),
pg([66,67], part("II","At the Dentist’s"), img("l13-dentist","260px"),
 p("June Parker has had a bad toothache for a couple of days. Then she decides to see Doctor Wilson."),
 dlg("*Doctor Wilson:* Come in, Miss Parker.","*June:* Am I late for my appointment?","*Doctor Wilson:* Just a little bit, but it’s all right.","*June:* I’m very sorry. It’s hard to find a place to park around here.","*Dr. Wilson:* O.K. What seems to be the trouble, Miss Parker?","*June:* I’m afraid a filling dropped out and I have a soreness around the tooth.","*Dr. Wilson:* Open your mouth wide, please. Show me exactly the area of your mouth you say hurts you.","*June:* It’s on the right side. The pain comes and goes, sometimes it is in one place and sometimes in another.","*Dr. Wilson:* Let’s see. The tooth seems to be sound. I don’t think it’s anything serious. Anyway we’d better take an X-ray just to be sure.","*Dr. Wilson:* Now let’s take a look at the filling. Yes, you were right. It isn’t there and there’s also a slight cavity on the back side of the tooth.","*June:* Oh, no! I don’t want the tooth pulled out.","*Dr. Wilson:* Don’t worry. It won’t be necessary. But it may need some drilling. We’ll start right now and then I’ll give you an appointment for next Thursday.","*June:* All right. I’m ready. Ouch! Ouch!")),
pg(67, h("Answer:"), wb("Why did June visit Dr. Wilson?","Why did she apologize to him?","What caused the pain in her mouth?","How can the dentist make sure it’s nothing serious?","Will she have the tooth pulled out?","When will she see Dr. Wilson again?", rg="10px")),
]
save("l13","Lesson Thirteen",P,jobs)

from h import *
jobs=[["l14-class",68,[100,124,730,690]],["l14-home",70,[230,120,600,480]],["l14-er",71,[200,300,600,760]]]
def youline(*doc):
    it=[]
    for d in doc: it+= [{"q":"*Doctor:* "+d,"noLine":True},{"q":"*You:*"}]
    return {"t":"write","num":False,"rowGap":"6px","qw":"50px","items":it}
P=[
pg(68, lesson(14,"Fourteen","Fourteenth (14th)"), img("l14-class","400px"), part("I","Characteristics of Medical Education"),
 p("The distinctive feature of medical education is how completely theoretical and scientific knowledge is fused with the results derived from experience. It must be remembered that the clinical teacher has an inmediate reponsibility to his patients as well as to his students. This double load of theory and practice is particularly heavier when great advances are being made in medical science.")),
pg([68,69], p("In most countries students must complete a four-or five-year medical education in order to obtain the license to practice. After that, in the present conditions, a practitioner of any branch of medicine needs at least four years to complete reasonably adequate training."),
 p("The premedical courses required in most countries are in the subjects of physics, chemistry and biology. Graduation from a recognized secondary school is required. Each of the courses should include laboratory periods of from two hours to six hours a week for a full academic year. However, the extent of the student’s familiarity with the use of instruments and laboratory procedures varies widely from country to country depending on the funds each country can use to support this expensive instruction."),
 p("The medical schools begin their work with the study of the structure of the body and its formation: anatomy, histology and embryology."),
 p("The sequence of the courses and the emphasis the schools give certain areas may differ from country to country, but medical schools should by all means adhere to the following basic pursuits: superior quality of the teaching staff, a high ratio of teaching staff to students, and adequate funds for laboratory work and research."),
 h("Answer:"), wb("Is medical education based only on theory and science?","How long does it take students to get a license to practice?","How can financial matters affect the quality of medical education?","Why should medical schools be very careful about the selection of teaching staff?", rg="4px")),
pg([69,70], part("II","Appendicitis"), h("At home:"),
 dlg("*Mr. Harris:* Hi, honey. I’m back from work.","*Cindy:* Hi, darling. What’s wrong with you? You look so pale and tired.","*Mr. Harris:* Oh, I don’t know. About two hours ago I began to feel awful. I’ve got awful pains in my belly.","*Cindy:* You have to see a doctor at once. Let me take you to the hospital."),
 img("l14-home","300px"), h("At the hospital:"),
 dlg("*Dr. Kramer:* Hello, I’m Dr. Kramer. What seems to be the trouble? What brings you to the emergency room?","*Mr. Harris:* It’s this awful pain in my belly.","*Dr. Kramer:* When did this pain start?","*Mr. Harris:* This morning. Up here, but now it’s here, and it really hurts.")),
pg(71, dlg("*Dr. Kramer:* How was it this morning?","*Mr. Harris:* Well, it wasn’t really very bad. The pain came and went, and I did some work in my office, but now I can’t stand it any more. It’s killing me.","*Dr. Kramer:* Have you lost your appetite?","*Mr. Harris:* Oh, sure. I haven’t had anything to eat since yesterday evening. I couldn’t even look at or smell food.","*Dr. Kramer:* Have you had any bowel movements?","*Mr. Harris:* Not for two days.","*Dr. Kramer:* Would you say this is normal?","*Mr. Harris:* No, as a rule I have one every day.","*Dr. Kramer:* Any diarrhea?","*Mr. Harris:* No.","*Dr. Kramer:* How about nausea and vomiting?","*Mr. Harris:* Last night it was really bad. I was vomiting about every two hours. It’s a little better now. Oh, oh, it’s coming again.","*Dr. Kramer:* Nurse, please help us. This seems to be a case of appendicitis."),
 img("l14-er","380px")),
pg([71,72], h("Give your own answers."), wb("Have you ever had an X-ray? Explain.","Have you ever fractured a bone? If so, when and where?","Have you ever had an accident or felt ill during a holiday? What happened?","How did it affect your vacation?","Were you insured against illness and accident?", rg="6px")),
pg(72, h("Complete the following dialogue:"),
 youline("You don’t look very well today.","What seems to be the trouble?","I see. Do you smoke?","How often do you exercise?","How is your appetite. Do you eat well?","You seem a little overweight. Roll up your sleeve. I want to check you blood pressure. Your blood pressure is down. That’s good, but you really should lose some weight.","Fine, Does your knee or ankle swell?"),
 dlg("*Doctor:* I think you are suffering from arthritis, but it’s nothing serious. Take these pills every six hours for a month. In this sheet of paper you will find some recommendation you should follow, come to my office in two weeks.")),
pg(73, part("III","Function: Talk About Health Problems"),
 inst("1.– Talking about health problems:"),
 pairs(["– What’s the matter?","I’ve got a headache."],["– What’s wrong?","I have a cold."],["– How do you feel?","I feel much better."],["– Does it hurt?","My shoulder hurts."],["– How are you feeling?","I’m feeling sick."]),
 inst("2.– Giving advice on health problems:"),
 pairs(["– I have a sore throat","You should see a doctor."],["– I have a toothache","Make an appointment with your dentist."],["– I have got the flue.","Take this medicine."],["– I have a fever","Why don’t you go to the doctor?"],["– I feel awful.","You’d better stay in bed."])),
]
save("l14","Lesson Fourteen",P,jobs)

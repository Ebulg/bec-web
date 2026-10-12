from h import *
jobs=[["l08-port",40,[16,62,808,420],[[90,392,200,420]]],["l08-bank",42,[28,74,800,515],[],{"keepLines":True}]]
tf=lambda *rows: table([[r,"",""] for r in rows], head=["Statement","T","F"], colsW="minmax(0,1fr) 50px 50px")
P=[
pg(39, lesson(8,"Eight","Eighth (8th)"), part("I","Exporting"),
 p("In the United States of America a business man who needs help to start marketing his products abroad must visit the Departament of Commerce. An official of the Departament will listen to him and see the specific areas he wants information about."),
 p("If you intend to sell your products in a foreign country, you will need to know how to select the foreign market. First of all you will have to find out what countries need or want your product. After that you may inquire about selling and promotion methods, channels of distribution, figures on population, consumption and foreign exchange reserves."),
 p("As the purchasing power in various countries is never the same, the official of the Departament of Commerce can provide you with data on the incomes of your possible customers."),
 p("You must give some attention to trade restrictions, such as tariffs and quotas, as well as other legal requirements which may include import licenses and exchange permits."),
 p("If you decided to test the market, you could mail catalogues and print lists. You might also display your products at fairs and trade centers."),
 p("You could size up your competitors abroad by examining directories and catalogues of products similar to yours. Moreover export magazines and trade publications will help you to compare specifications, functions, quality, packaging, and appearance."),
 p("If you are still interested in exporting something, I wish you good luck.")),
pg(40, img("l08-port","300px"), h("Answer:"), wb("How should he select the foreign market?","Who can provide you with data on the income of your possible customers?","How can you test the market?","Where can you display your products?", rg="6px")),
pg([40,41], h("Decide whether the following statements are TRUE or FALSE"),
 tf("1. The U.S. Departament of Commerce is never willing to help businessmen.","2. The purchasing power in Venezuela is different from the purchasing power in the U.S.A.","3. Price lists and catalogues can be used to test the customer’s response to the product.","4. Trade restrictions can be overlooked.","5. Information about products similar to yours can be found in local departament stores.","6. You won’t market your product in a country which doesn’t need it.")),
pg(41, part("II","At the Bank"),
 p("Mr. Thomas Paulson, a successful businessman, is talking with Mr. Roger Chapman, an important banker, in his office in New York."),
 dlg("*Mr. Paulson:* I’m just gathering information about international trade, and I hope you can give me some advice on how to finance exports.","*Mr. Chapman:* Well, I think I can offer you a little help.","*Mr. Paulson:* Fine. One thing I would like to know is if my customer can deposit the full payment for the goods transferred to your bank.","*Mr. Chapman:* Oh, certainly. There’s no problem at all. Your customer’s bank will forward a letter of credit to us.","*Mr. Paulson:* Then if I fulfill the terms of the sales contract, will I get the payment?","*Mr. Chapman:* That’s right. You will receive your money as soon as you present to this bank a commercial invoice, an insurance certificate and a set of on-board bill of lading.","*Mr. Paulson:* This would be evidence that the goods were received by the customer.","*Mr. Chapman:* Yes.","*Mr. Paulson:* My customer has agreed to give me an irrevocable letter of credit.","*Mr. Chapman:* That sounds fine. That’s almost cash in advance.","*Mr. Paulson:* Could I sell to my foreign customers on open account, just as I do here in my country?","*Mr. Chapman:* If the customer’s credit is good, that will be all right.","*Mr. Paulson:* Thanks. That’s all for now.")),
pg(42, img("l08-bank","380px"), h("Answer:"), wb("What kind of information is Mr. Paulson looking for?","Can Mr. Chapman help him?","What first thing does Mr. Paulson want to know?","What would happen if Mr. Paulson fulfills the terms of the sales contract?","When will Mr. Paulson receive his money?","What has Mr. Paulson’s customer agreed to give him?", rg="4px")),
pg(43, h("Practice these dialogues with your teacher."),
 inst("1."), dlg("*a.–* Are you going to see the manager of the bank today?","*b.–* I wish I could, but I don’t have the time.","*a.–* What are you going to do?","*b.–* I have an appointment with a Venezuelan businessman."),
 inst("2."), dlg("*a.–* Can you advise me on marketing products abroad?","*b.–* I’m afraid, I can’t. Why don’t you consult Mr. Chapman?","*a.–* Do you think he can help me?","*b.–* Sure. He has been exporting goods abroad for about ten years."),
 inst("3."), dlg("*a.–* May I use your telephone?","*b.–* I’m afraid not.","*a.–* Why not?","*b.–* Because it’s out of order."),
 h("Word game"), p("How many words can you make from these nine letters? You can use each letter once only."),
 table([["U","B","A"],["N","M","C"],["E","L","A"]], w="180px", align="center")),
pg(43, part("III","Function: Making Request"),
 table([["Can you possibly…?","I’m sorry, I can’t…"],["Would you mind… (ing)?","Sure,…"],["Would you mind if…?","Of course not…."],["Could you…?","Certainly, I’d be very pleased to."]], head=["Formal","Possible responses"]),
 table([["Do me a favor, will you?","I wish I could, but…"],["You don’t mind if…, do you?","Whatever you say…"],["I’d like you to…","Not at all."]], head=["Informal","Possible responses"])),
]
save("l08","Lesson Eight",P,jobs)

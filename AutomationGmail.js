
// const CONFIG = {

//   // sheet name
//   formSheet: "Form Data",

//   // column numbers for Form Data Sheet
//   fd: {

//     timeStamp: 1,
//     name: 2,
//     email: 3,
//     companyName: 4,
//     contact: 5,
//     serviceRequired: 6,
//     budget: 7,
//     message: 8,
//     processed: 9,
//     leadId: 10,
//     leadStatus: 11,
//     emailStatus: 12

//   },


//   // Unique key
//   counterKey: "LEAD_COUNTER",

//   // Self Email
//   notifyEmail: "hamzuansari7@gmail.com"

// }


// // The Main Worker - where the main work will be done.
// function processNewLeads() {

//   const wholeSheet = SpreadsheetApp.getActiveSpreadsheet();

//   const formDataSheet = wholeSheet.getSheetByName(CONFIG.formSheet)

//   const lastrow = formDataSheet.getLastRow();

//   const data = formDataSheet.getRange(2, 1, lastrow - 1, 12).getValues();

//   for (let i = 0; i < data.length; i++) {

//     const row = data[i];


//     const timeStamp = row[0];
//     const name = row[1];
//     const email = row[2];
//     const companyName = row[3];
//     const contact = row[4];
//     const serviceRequired = row[5];
//     const budget = row[6];
//     const message = row[7];
//     const processed = row[8];

//     // check if the data/lead is already processed and if not then run the code inside if block.
//     if (processed === "") {

//       const leadId = getNextLeadId();

//       formDataSheet.getRange(i + 2, CONFIG.fd.leadId).setValue(leadId);
//       formDataSheet.getRange(i + 2, CONFIG.fd.leadStatus).setValue("New, At: " + new Date());
//       formDataSheet.getRange(i + 2, CONFIG.fd.emailStatus).setValue("Not Sent");

//       const submitted = Utilities.formatDate(timeStamp, "Asia/Kolkata", "dd MMM yyyy, HH:mm");

//       // Send Email To Client.
//       sendConfirmationEmail(leadId, name, email, companyName, contact, serviceRequired, budget);

//       formDataSheet.getRange(i + 2, CONFIG.fd.emailStatus).setValue("Sent, At: " + new Date());

//       // Send Email to Self.
//       sendInternalNotification(leadId, name, companyName, serviceRequired, budget, submitted);

//       // Log to check
//       // Logger.log("Created: " + leadId);

//       formDataSheet.getRange(i + 2, CONFIG.fd.processed).setValue("Processed At: " + new Date());

//     }

//   }

// }


// // Reads counter, increments, saves back.
// function getNextLeadId() {

//   // formDataSheet.getRange(i + 2, CONFIG.fd.leadID).setValue(leadID);

//   // formDataSheet.getRange(i + 2, CONFIG.fd.leadStatus).setValue("New");

//   // formDataSheet.getRange(i + 2, CONFIG.fd.emailSent).setValue("Not Sent");

//   const props = PropertiesService.getScriptProperties();

//   // PropertiesService.getScriptProperties().deleteProperty(CONFIG.counterKey);

//   let current = props.getProperty(CONFIG.counterKey);

//   if (current === null) {

//     current = 0;

//   }

//   const next = Number(current) + 1;

//   const formatted = "LEAD - " + ("000" + next).slice(-4);

//   props.setProperty(CONFIG.counterKey, next);

//   return formatted;

// }


// //The Email to Client.
// function sendConfirmationEmail(leadId, name, email, companyName, contact, serviceRequired, budget) {

//   const emailId = email;

//   const subject = "Confirmation Mail For: " + leadId + " with name: " + name;

//   const body = "Hi, " + name + "," +
//     "\n\nYour reference ID is: " + leadId + "." +
//     "\nYour Agency: " + companyName +
//     "\nWith Contact: " + contact +
//     "\nFor Service: " + serviceRequired +
//     "\nwith estimated budget of: " + budget +
//     "\n\nThank you for contacting us. " +
//     "\n\nWe will connect with you shortly." +
//     "\n\nBest Regards, " + "\nAL Tech Solutions."

//   MailApp.sendEmail(emailId, subject, body);

// }


// // Notification to Myself.
// function sendInternalNotification(leadId, name, companyName, serviceRequired, budget, submitted) {

//   MailApp.sendEmail({

//     to: CONFIG.notifyEmail,

//     subject: "New Lead Received: " + leadId,

//     body: "Hey Hamza, " + "\n\nWe've got a new Lead, " +
//       "\nReceived at: " + submitted +
//       "\nFrom: " + name +
//       "\nBy Company: " + companyName +
//       "\nFor Service: " + serviceRequired +
//       "\nWith Estimated Budget of: " + budget + "." +
//       "\n\nSee You Again."

//   });

// }






































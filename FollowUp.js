const CONFIG = {

  followUpSheet: "Sheet3",

  sh: {

    followUpId: 0,
    clientName: 1,
    clientEmail: 2,
    followUpDate: 3,
    status: 4,
    reminderSent: 5,
    notes: 6

  },

  notifyEmail: "hamzuansari7@gmail.com"

}

function followUpSystem() {

  const sheet = SpreadsheetApp.getActiveSpreadsheet();
  const followUp = sheet.getSheetByName(CONFIG.followUpSheet);

  const lastRow = followUp.getLastRow();
  const data = followUp.getRange(2, 1, lastRow - 1, 8).getValues();

  for (let i = 0; i < data.length; i++) {

    const row = data[i];

    const followUpId = row[CONFIG.sh.followUpId];
    const clientName = row[CONFIG.sh.clientName];
    const clientEmail = row[CONFIG.sh.clientEmail];
    const followUpDate = row[CONFIG.sh.followUpDate];
    const status = row[CONFIG.sh.status];
    const reminderSent = row[CONFIG.sh.reminderSent];
    const notes = row[CONFIG.sh.notes];

    // Logger.log(followUpId + " , " + clientEmail);

    const dueDate = new Date();

    if (followUpDate === "Tomorrow") {

      dueDate.setDate(dueDate.getDate() + 1);

    } else if (followUpDate === "Yesterday") {

      dueDate.setDate(dueDate.getDate() - 1);

    }

    if (status.trim() === "Pending" && reminderSent.trim() === "NO" && dueDate <= new Date()) {

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      dueDate.setHours(0, 0, 0, 0);

      const daysOverdue = (today - dueDate) / (1000 * 60 * 60 * 24);

      let subject;
      let htmlBody;

      if (daysOverdue === 0) {

        subject = "Reminder: Follow-up due today - " + followUpId;
        htmlBody = `<p>Hi ${clientName}, just a friendly reminder about our follow-up today.</p>`;

      } else if (daysOverdue <= 2) {

        subject = "Overdue: Please respond - " +  followUpId;
        htmlBody = `<p>Hi ${clientName}, our follow-up was due ${daysOverdue} day(s) ago.</p>`;
      } else {

        subject = "URGENT: Escalation";
        htmlBody = `<p>Hi ${clientName}, this is an urgent escalation. Our follow-up is ${daysOverdue} days overdue.</p>`;

      }

      GmailApp.sendEmail(
        clientEmail,
        subject,
        "",
        { htmlBody: htmlBody }
      );



      followUp.getRange(i + 2, 6).setValue("YES.")

      followUp.getRange(i + 2, 5).setValue("Completed.")

    }

  }

}











































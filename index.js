const { program } = require("commander");
const contacts = require("./contacts");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      return console.table(allContacts);
      break;
    case "get":
      const contactById = await contacts.getContactById(id);
      console.table(contactById);
      break;
    case "remove":
      const contactDeleteById = await contacts.removeContact(id);
      console.table(contactDeleteById);
      break;
    case "add":
      const contactAdd = await contacts.addContact(name, email, phone);
      console.table(contactAdd);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);

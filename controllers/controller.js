const Contact = require("../schema/contacts_schema");

exports.createContact = async (req, res) => {
  const updatedAt = new Date();
  const job = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    department: req.body.department,
    address: req.body.address,
    age: req.body.age,
    createdAt: updatedAt,
    image_url: req?.file?.filename ? `static/${req?.file.filename}` : null,
  };

  const jobs = new Contact(job);

  try {
    await jobs.save();

    res.status(201).json(jobs);
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error });
  }
};

exports.readContacts = async (req, res) => {
  try {
    // lazy implementation
    filter = { _id: -1 };
    if (req.query.filter == "latest") {
      filter = { _id: -1 };
    }
    if (req.query.filter == "oldest") {
      filter = { _id: 1 };
    }
    if (req.query.filter == "ascending") {
      filter = { firstName: -1 };
    }
    if (req.query.filter == "descending") {
      filter = { firstName: 1 };
    }

    const response = await Contact.find()
      .collation({ locale: "en", strength: 2 })
      .sort(filter);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error });
  }
};

exports.readContact = async (req, res) => {
  try {
    const response = await Contact.findOne({ _id: req.params.id });
    if (response.length == 0) {
      return res.status(400).json({ message: "Not found" });
    }
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const response = await Contact.findByIdAndRemove(req.params.id);
    console.log(response);
    if (response == null) {
      return res.status(400).json({ message: "Not found" });
    }
    res.status(200).json({ message: "Successful" });
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error });
  }
};

exports.updateContact = async (req, res) => {
  try {
    // did not fetch current update info, lazy implementation
    const response = await Contact.updateOne(
      { _id: req.params.id },
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          phoneNumber: req.body.phoneNumber,
          email: req.body.email,
          department: req.body.department,
          address: req.body.address,
          age: req.body.age,
          image_url: req?.file?.filename
            ? `static/${req?.file.filename}`
            : null,
        },
      }
    );
    if (response.modifiedCount == 0) {
      return res.status(400).json({ message: "Not found" });
    }
    res.status(200).json({ message: "Successful" });
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error });
  }
};

exports.searchContact = async (req, res) => {
  try {
    // lazy implementation
    filter = { _id: -1 };
    if (req.query.filter == "latest") {
      filter = { _id: -1 };
    }
    if (req.query.filter == "oldest") {
      filter = { _id: 1 };
    }
    if (req.query.filter == "ascending") {
      filter = { firstName: 1 };
    }
    if (req.query.filter == "descending") {
      filter = { firstName: -1 };
    }

    const response = await Contact.find({
      $or: [
        { firstName: { $regex: req.query.query, $options: "i" } },
        { lastName: { $regex: req.query.query, $options: "i" } },
        { phoneNumber: { $regex: req.query.query, $options: "i" } },
        { email: { $regex: req.query.query, $options: "i" } },
      ],
    })
      .collation({ locale: "en", strength: 2 })
      .sort(filter);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error });
  }
};

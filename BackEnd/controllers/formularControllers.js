import FormularModel from "../models/formular.js";
import UserModel from "../models/user.js";

export const createFormular = async (req, res) => {
  try {
    const { regiment, battalion, company, platoon, section } = req.body;
    const user = await UserModel.findById(req.userId);
    const regimentUser = user.regiment;
    const battalionUser = user.battalion;
    const companyUser = user.company;
    const platoonUser = user.platoon;
    const sectionUser = user.section;

    let doc;

    if (regiment && battalion && company && platoon && section) {
      doc = new FormularModel({
        user: req.userId,
        regiment: regiment,
        battalion: battalion,
        company: company,
        platoon: platoon,
        section: section,
        nameOfTechnique: req.body.nameOfTechnique,
        count: req.body.count,
        state: req.body.state,
      });
    } else {
      doc = new FormularModel({
        user: req.userId,
        regiment: regimentUser,
        battalion: battalionUser,
        company: companyUser,
        platoon: platoonUser,
        section: sectionUser,
        nameOfTechnique: req.body.nameOfTechnique,
        count: req.body.count,
        state: req.body.state,
      });
    }

    const formular = await doc.save();

    res.json(formular);
  } catch (error) {
    console.log(error);
    res.status(500).json({ title: "Formular error", message: "failed to create formular" });
  }
};

export const getUniqueMilitaryBase = (req, res) => {
  const militaryBase = req.params.militaryBase;
  FormularModel.aggregate([
    {
      $group: {
        _id: `$${militaryBase}`,
      },
    },
  ])
    .exec()
    .then((results) => {
      const unique = results.map((result) => result._id).sort();
      res.json(unique);
    })
    .catch((err) => {
      console.error("Помилка під час запиту до бази даних:", err);
      res.status(500).json({ error: "Помилка на сервері" });
    });
};

export const getFilteredFormular = async (req, res) => {
  try {
    const { regiment, battalion, company, platoon, section, nameOfTechnique, state } = req.body;
    const filtered = { regiment, battalion, company, platoon, section, nameOfTechnique, state };

    for (let key in filtered) {
      if (!filtered[key]) {
        delete filtered[key];
      }
    }

    const results = await FormularModel.find(filtered).sort({ createdAt: -1 }).exec();
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ title: "Formular error", message: "failed to get filtered formular" });
  }
};

export const getAllFormulars = async (req, res) => {
  try {
    const results = await FormularModel.find({}).sort({ createdAt: -1 }).exec();
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ title: "Formular error", message: "failed to get all formulars" });
  }
};

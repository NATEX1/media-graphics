const Result = require("../models/Result");
const { ObjectId } = require("mongodb");

const savedResult = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { type, section, response, score } = req.body;

    const existingResult = await Result.findOne({
      user: userId,
      type,
      section,
    });

    if (existingResult) {
      return res.status(400).json({
        error: "Result already exists for this user, type, and section.",
      });
    }

    const newResult = new Result({
      user: userId,
      type,
      section,
      response,
      score,
    });

    const savedResult = await newResult.save();
    res.status(201).json(savedResult);
  } catch (error) {
    console.error("Error saving/updating result data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getResult = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { type, section } = req.query;
    const query = { user: userId };
    if (type) {
      query.type = type;
    }

    if (section) {
      query.section = section;
    }

    const results = await Result.find(query).populate("user", "-password");

    res.json(results);
  } catch (error) {
    console.error("Error fetching result data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllResults = async (req, res) => {
  try {
    const { section, type } = req.query;

    const query = {};
    if (section) {
      query.section = parseInt(section);
    }
    if (type) {
      query.type = type;
    }

    const results = await Result.find(query).populate("user", "-password");

    return res.status(200).json(results);
  } catch (error) {
    console.error("Error getting results:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getResultById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Result.findById(id).populate("user", "-password");

    res.json(result);
  } catch (error) {
    console.error("Error fetching result data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getResultByUserId = async (req, res) => {
  try { 
    const { userId } = req.params;
    const results = await Result.find({ user: userId }).populate(
      "user",
      "-password"
    );

    if (!results || results.length === 0) {
      return res
        .status(404)
        .json({ message: "No results found for the user." });
    }

    res.json(results);
  } catch (error) {
    console.error("Error fetching result data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  savedResult,
  getResult,
  getResultById,
  getAllResults,
  getResultByUserId,
};

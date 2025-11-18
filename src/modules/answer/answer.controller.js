import answerService from "./answer.service.js"; 

export const createAnswer = async (req, res) => {
  try {
    const answer = await answerService.createAnswer(req.body);
    res.status(201).json(answer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAnswers = async (req, res) => {
  try {
    const answers = await answerService.getAllAnswers();
    res.json(answers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAnswer = async (req, res) => {
  try {
    const answer = await answerService.getAnswerById(req.params.id);
    if (!answer) return res.status(404).json({ message: "Answer not found" });

    res.json(answer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAnswer = async (req, res) => {
  try {
    const answer = await answerService.updateAnswer(req.params.id, req.body);
    if (!answer) return res.status(404).json({ message: "Answer not found" });

    res.json(answer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteAnswer = async (req, res) => {
  try {
    const result = await answerService.deleteAnswer(req.params.id);
    if (!result) return res.status(404).json({ message: "Answer not found" });

    res.json({ message: "Answer deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

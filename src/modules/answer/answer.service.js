import Answer from "../../models/Answer.js"; 
export default {
  async createAnswer(data) {
    const answer = new Answer(data);
    return await answer.save();
  },

  async getAllAnswers() {
    return await Answer.find().populate("id_question");
  },

  async getAnswerById(id) {
    return await Answer.findById(id).populate("id_question");
  },

  async updateAnswer(id, data) {
    return await Answer.findByIdAndUpdate(id, data, { new: true });
  },

  async deleteAnswer(id) {
    return await Answer.findByIdAndDelete(id);
  }
};

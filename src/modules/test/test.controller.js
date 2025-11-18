import {
  createTest,
  getAllTests,
  getTestById,
  updateTest,
  deleteTest
} from './test.service.js';

export async function createTestController(req, res) {
  try {
    const testData = req.body;
    if (!testData) return res.status(400).json({ success: false, message: 'No test data provided' });

    const newTest = await createTest(testData);
    return res.status(201).json({ success: true, message: 'Test created', data: newTest });

  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error creating test', error: error.message });
  }
}

export async function getAllTestsController(req, res) {
  try {
    const tests = await getAllTests();
    return res.status(200).json({ success: true, data: tests });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error fetching tests', error: error.message });
  }
}

export async function getTestByIdController(req, res) {
  try {
    const { id } = req.params;
    const test = await getTestById(id);
    if (!test) return res.status(404).json({ success: false, message: 'Test not found' });

    return res.status(200).json({ success: true, data: test });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error fetching test', error: error.message });
  }
}

export async function updateTestController(req, res) {
  try {
    const { id } = req.params;
    const updatedTest = await updateTest(id, req.body);
    if (!updatedTest) return res.status(404).json({ success: false, message: 'Test not found' });

    return res.status(200).json({ success: true, message: 'Test updated', data: updatedTest });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error updating test', error: error.message });
  }
}

export async function deleteTestController(req, res) {
  try {
    const { id } = req.params;
    const deletedTest = await deleteTest(id);
    if (!deletedTest) return res.status(404).json({ success: false, message: 'Test not found' });

    return res.status(200).json({ success: true, message: 'Test deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error deleting test', error: error.message });
  }
}

import { PersonalDetails, AcademicQualification, EmploymentRecord } from '../models/index.js';

export const registerUser = async (req, res) => {
  try {
    const { personalDetails, academicQualifications, employmentDetails } = req.body;

    const personal = await PersonalDetails.create(personalDetails);
    console.log('Received req.body:', req.body);
    console.log(Object.keys(academicQualifications).length, 'academic qualifications received');
    const academic = await AcademicQualification.bulkCreate(academicQualifications);

    const employment = await EmploymentRecord.bulkCreate(employmentDetails);

    res.status(201).json({ personal, academic, employment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

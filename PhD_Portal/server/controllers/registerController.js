import { PersonalDetails, AcademicQualification, EmploymentRecord } from '../models/index.js';

export const registerUser = async (req, res) => {
  try {
    const { personalDetails, academicQualifications, employmentRecords } = req.body;

    const personal = await PersonalDetails.create(personalDetails);
    console.log('Received req.body:', req.body);

    const academic = await AcademicQualification.bulkCreate(
      academicQualifications.map(item => ({ ...item, email: personalDetails.email }))
    );

    const employment = await EmploymentRecord.bulkCreate(
      employmentRecords.map(item => ({ ...item, email: personalDetails.email }))
    );

    res.status(201).json({ personal, academic, employment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

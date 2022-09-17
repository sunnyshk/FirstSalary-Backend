const Job = require("../models/job.models");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ name: req.user.name }).sort("createdAt");
  return res.status(200).send(jobs);
};

const getJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  const job = await Job.findOne({
    _id: jobId,
  });
  if (!job) {
    return res.status(500).send({ message: "Job not found" });
  }
  return res.status(200).send(job);
};

const createJob = async (req, res) => {
  // console.log(req.body.createdBy);
  const job = await Job.create(req.body);
  // console.log(req.body.createdBy);
  return res.status(200).send(job);
};

const updateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;
  if (company == "" || position == "") {
    res.status(400).send({ message: "Bad request" });
  }
  const job = await Job.findOneAndUpdate(
    {
      _id: jobId,
      // createdBy: userId,
    },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!job) {
    return res.status(500).send({ message: "Job not found" });
  }
  return res.status(200).send(job);
};

const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findByIdAndRemove({
    _id:jobId
  })
  if (!job) {
    return res.status(500).send({ message: "Job not found" });
  }
  return res.status(200).send(job);
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};

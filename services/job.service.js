const Job = require('../model/job');
var jobDao = {
    findAll: findAll,
    create: create,
    findById: findById,
    deleteById: deleteById,
    updateJob: updateJob
}

function findAll() {
    return Job.findAll();
}

function findById(id) {
    return Job.findByPk(id);
}

function deleteById(id) {
    return Job.destroy({ where: { id: id } });
}

function create(job) {
    var newJob = new Job(job);
    return newJob.save();
}

function updateJob(job, id) {
    var updateJob = {
        title: job.title,
        technologies: job.technologies,
        description: job.description,
        budget: job.budget,
        contact_email: job.contact_email
    };
    return Job.update(updateJob, { where: { id: id } });
}
module.exports = jobDao;
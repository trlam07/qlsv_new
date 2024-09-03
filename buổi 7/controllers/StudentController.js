const studentModel = require('../models/Student');
const {format} = require('date-fns')
class StudentController {
    static index = async (req, res) => {
        try {
            const search = req.query.search;
            const page = req.query.page || 1;
            const item_per_page = process.env.ITEM_PER_PAGE;
            let students = [];
            let totalStudents = [];
            if(search) {
                students = await studentModel.getByPattern(search, page, item_per_page);
                totalStudents = await studentModel.getByPattern(search);
            } else {
                students = await studentModel.all(page, item_per_page);
                totalStudents = await studentModel.all();
            };

            const totalPage = Math.ceil(totalStudents.length / item_per_page);

            const message_success = req.session.message_success;
            const message_error = req.session.message_error;
            res.render('student/index', {
                students: students,
                format: format,
                search: search,
                message_success: message_success,
                message_error: message_error,
                totalPage: totalPage
            });
            res.end();
        } catch (error) {
            throw new(error)
        }
    };
    static create = (req, res) => {
        try {
            res.render('student/create');
        } catch (error) {
            res.status(500).send(error.message)
        }
    };
    static store = async (req, res) => {
        try {
            console.log(req.body);
            // lưu dữ liệu vào database
            await studentModel.save(req.body);
            // lưu session vào req
            req.session.message_success = `Đã tạo sinh viên ${req.body.name} thành công!`
            // điều hướng đến Trang danh sách sv
            res.redirect('/')
        } catch (error) {
            // res.status(500).send(error.message)
            req.session.message_error = `${error.message}`;
            res.redirect('/');
        }
    };

    static edit = async (req, res) => {
        try {
            const student = await studentModel.find(req.params.id)
            res.render('student/edit', {student: student})
            
        } catch (error) {
            res.status(500).send(error.message)
        }
    };

    static update = async (req, res) => {
        try {
            const id = req.body.id;
            const name = req.body.name;
            const birthday = req.body.birthday;
            const gender = req.body.gender;
            // lấy student từ database lên
            const student = await studentModel.find(id);
            // cập nhật giá trị người dùng
            student.name = name;
            student.birthday = birthday;
            student.gender = gender;
            // lưu xuống database
            await student.update();
            // lưu session vào req
            req.session.message_success = `Đã cập nhật sinh viên ${req.body.name} thành công!`
            // điều hướng đến Trang danh sách sv
            res.redirect('/')
        } catch (error) {
            // res.status(500).send(error.message)
            req.session.message_error = `${error.message}`;
            res.redirect('/');
        }
    };
}
module.exports = StudentController;
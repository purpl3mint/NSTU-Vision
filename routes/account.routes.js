const {Router} = require('express');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const Admin = require('../models/Admin');
const Observer = require('../models/Observer');
const Camera = require('../models/Camera');
const router = Router();

// /api/account
router.post('', 
    [
        check('login', 'Минимальная длина логина 6 символов').isLength({min: 6}),
        check('password', 'Минимальная длина пароля 8 символов').isLength({min: 8})
    ],
    async (req, res) => {

    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array,
                message: 'Некорректные данные при создании аккаунта'
            });
        }

        const {login, password, type} = req.body;
        
        const candidateAdmin = await Admin.findOne({login});
        const candidateObserver = await Observer.findOne({login});
        const candidateCamera = await Camera.findOne({login});

        if (candidateAdmin || candidateObserver || candidateCamera) {
            return res.status(400).json({message: 'Такой пользователь уже существует'});
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        let newAccount;

        switch (type){
            case 'admin':
                newAccount = new Admin({login, password: hashedPassword});
                break;
            case 'observer':
                newAccount = new Observer({login, password: hashedPassword});
                break;
            case 'camera':
                newAccount = new Camera({login, password: hashedPassword, streamId: req.body.streamId});
                break;
            default:
                break;
        }

        if (newAccount) {
            await newAccount.save();
            res.status(201).json({message: 'Аккаунт создан'});
        }
        else {
            res.status(500).json({message: 'Аккаунт не создан, не удается распознать тип'});
        }


    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
    }
});

router.get('', async (req,res) => {
    try {
        const {userType, userName} = req.query;
        let accounts;


        const query = {
           login: {$regex: userName, $options: "i"}
        }

        switch (userType) {
            case 'admin':
                accounts = await Admin.find(query);
                break;
            case 'observer': 
                accounts = await Observer.find(query);
                break;
            case 'camera':
                accounts = await Camera.find(query);
                break;
            default:
                const accountsAdmins = await Admin.find(query);
                const accountsObservers = await Observer.find(query);
                const accountsCameras = await Camera.find(query);
            
                accounts = accountsAdmins + accountsCameras + accountsObservers;
                break;
        }

        if (accounts) {
            res.status(201).json({message: 'Список аккаунтов доставлен', accounts});
        }
        else {
            res.status(500).json({message: 'Список аккаунтов получить не удалось'});
        }

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
    }

});

router.delete('', async (req, res) => {
    try {
        const {login, type} = req.body;

        let succeed = false;

        switch (type) {
            case 'admin':
                await Admin.findOneAndDelete({login});
                succeed = true;
                break;
            case 'observer': 
                await Observer.findOneAndDelete({login});
                succeed = true;
                break;
            case 'camera':
                await Camera.findOneAndDelete({login});
                succeed = true;
                break;
            default:
                break;
        }

        if (succeed) {
            res.status(201).json({message: 'Аккаунт успешно удален'});
        }
        else {
            res.status(500).json({message: 'Не получилось удалить аккаунт'});
        }

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
    }
});

module.exports = router;
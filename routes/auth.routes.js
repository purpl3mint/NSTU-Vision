const {Router} = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');
const Admin = require('../models/Admin');
const Observer = require('../models/Observer');
const Camera = require('../models/Camera');
const router = Router();

// /api/auth/login
router.post('/login',
    [
        check('login', 'Введите логин').exists(),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req);

        
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array,
                message: 'Некорректные данные при входе в систему'
            });
        }
        

        const {login, password} = req.body;
        
        const candidateAdmin = await Admin.findOne({login});
        const candidateObserver = await Observer.findOne({login});
        const candidateCamera = await Camera.findOne({login});

        let user, userType;

        if (candidateAdmin) {
            user = candidateAdmin;
            userType = 'admin';
        }
        else if (candidateObserver) {
            user = candidateObserver;
            userType = 'observer';
        }
        else if (candidateCamera) {
            user = candidateCamera;
            userType = 'camera';
        }
        else {
            return res.status(400).json({message: 'Пользователь не найден'});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({message: 'Неверный пароль, попробуйте снова'});
        }


        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtSecret'),
            {expiresIn: '1h'}
        );

        res.json({ token, userId: user.id, userType});

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
});

// Надо ли его реализовывать?
router.delete('/login', async (req, res) => {
    try {
        res.status(200).json({message: 'Функция находится в разработке'});
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
    }
});

// /api/auth/me
router.get('/me', async (req,res) => {
    try {
        const {myId, myType} = req.body;

        let account;
        switch(myType) {
            case 'admin':
                account = await Admin.findById(myId);
                break;
            case 'observer':
                account = await Observer.findById(myId);
                break;
            case 'camera':
                account = await Camera.findById(myId);
                break;
            default:
                break;
        }

        if (!account) {
            return res.status(400).json({message: 'Что-то пошло не так'});
        }

        res.status(200).json(account);

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
    }
});

module.exports = router;
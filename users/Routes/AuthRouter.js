const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./User.js');

// Регистрация/Авторизация
router.post('/register', async (req, res) => {
    try {
        const {username, email, password} = req.body;

        // Хеширование пароля перед сохранением
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashedPassword,
            created: new Date().toISOString(), // Установите текущую дату и время как дату регистрации
        });

        await user.save();
        res.status(201).json({message: 'Пользователь успешно зарегистрирован'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Произошла ошибка при регистрации'});
    }
});
router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if (!user) {
            return res.status(401).json({message: 'Пользователь не найден'});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({message: 'Неверный пароль'});
        }

        const token = jwt.sign({userId: user._id}, 'your-secret-key', {expiresIn: '1h'});
        res.status(200).json({token});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Произошла ошибка при аутентификации'});
    }
});

// Действия с юзером
router.post('/changeRole', async (req, res) => {
    const {email, newRole} = req.body;

    try {
        // Найдем пользователя по его email
        const user = await User.findOne({email});

        if (!user) {
            return res.status(404).json({message: 'Пользователь не найден'});
        }

        // Устанавливаем новую роль
        user.role = newRole;

        // Сохраняем обновленного пользователя
        await user.save();

        res.status(200).json({message: 'Роль пользователя успешно изменена', updatedUser: user});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Произошла ошибка при изменении роли пользователя'});
    }
});

router.delete('/delUser/:email', async (req, res) => {
    const { email } = req.params;

    try {
        const user = await User.findOneAndRemove({ email });

        if (!user) {
            return res.status(404).json({ status: '404', message: 'Пользователь не найден' });
        }

        res.status(200).json({ status: '200', message: 'Пользователь успешно удален' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: '500', message: 'Произошла ошибка при удалении пользователя' });
    }
});


// Действия со всеми юзерами
router.get('/getAll', async (req, res) => {
    try {
        const users = await User.find({}, {password: 0});
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Произошла ошибка при получении пользователей'});
    }
});
module.exports = router;
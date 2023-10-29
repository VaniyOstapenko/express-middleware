function isValidUserId(req, res, next) {
    const { id } = req.params;

    if (!id) throw new Error('Значение id не может быть пустым');
    if (isNaN(id)) throw new Error('id должно быть числом');

    next();
}

function isValidUserData(req, res, next) {
    const { name, surname, email, pwd } = req.body;

    if (!name) throw new Error('значение имени пустое');
    if (!isNaN(name)) throw new Error('значение имени не может быть числом');

    if (!surname) throw new Error('значение фамилии пустое');
    if (!isNaN(surname)) throw new Error('значение фамилии не может быть числом');


    if (!email) throw new Error('значение почты пустое');
    if (!/^[a-zA-Z0-9\.\s]+@[a-z]+.[a-z]{2,4}$/gm.test(email)) throw new Error('значение почты неверное');

    if (!pwd) throw new Error('значение пароля пустое');
    if (!/^[A-Z]+[a-z]+\W+[0-9]+$/gm.test(pwd)) throw new Error('значение пароля неверное');

    next();
}

module.exports = { isValidUserId, isValidUserData };
import User from '../models/User.js';
import { encrypt, compare } from './helpers/handleBCrypt.js';
import { tokenSign } from './helpers/generateToken.js';
import { sendMail } from '../librarys/emailer.js';

export const getUsers = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (email) {
      const user = await User.findOne({ email });
      if (!user) return res.status(405).send('Email no encontrado');
      const checkPassword = await compare(password, user.password);

      checkPassword
        ? res.status(201).send('Password is OK')
        : res.status(409).send('Contraseña inválida');
    } else {
      const users = await User.find({});
      if (!users) return res.status(404).json({ msg: 'Users not found' });
      return res.json(users);
    }
  } catch (e) {
    return res.send(404).json({ msg: `Error 404 - ${e}` });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(405).send('User not found');
    return res.status(200).json(user);
  } catch (e) {
    return res.send(404).json({ msg: `Error 404 - ${e}` });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.json({ msg: 'User not found' });

    const checkPassword = await compare(password, user.password);
    const tokenSession = await tokenSign(user);
    if (checkPassword) {
      res.status(200).send({
        data: user,
        tokenSession,
      });
    }
    if (!checkPassword) {
      return res.json({ msg: 'Invalid password' });
    }
  } catch (e) {
    return res.json({ msg: `Error 404 - ${e}` });
  }
};

export const postUsersGoogle = async (req, res) => {
  try {
    const { username, email_verified, email, role, cart } = req.body;
    if (!username || !email || !email_verified)
      return res.json({ msg: 'Missing required fields' });
    const userBDGoo = await User.findOne({ email });
    if (userBDGoo) {
      return res.json({ msg: 'The email already exists' });
    }

    await User.create({
      username: username,
      email_verified: email_verified,
      email: email,
      role: role || 'user',
    });

    await sendMail(email, username)
      .then((result) => console.log('email sended'))
      .catch((err) => console.log(err));

    return res.json({ msg: `${username} create succesfully` });
  } catch (e) {
    return res.json({ msg: `Error 404 - ${e}` });
  }
};

export const postUsers = async (req, res) => {
  try {
    const { username, password, email, role, cart } = req.body;
    if (!username || !password || !email)
      return res.json({ msg: 'Missing required fields' });
    const userBD = await User.findOne({ email });
    if (userBD) return res.json({ msg: 'The email already exists' });
    const usernameBD = await User.findOne({ username });
    if (usernameBD) return res.json({ msg: 'The username already exists' });

    const passwordHash = await encrypt(password);
    await User.create({
      username: username,
      password: passwordHash,
      email: email.toLowerCase(),
      role: role || 'user',
    });

    sendMail(email, username)
      .then((result) => console.log('email sended'))
      .catch((err) => console.log(err));

    return res.json({ msg: `${username} create succesfully` });
  } catch (e) {
    return res.json({ msg: `Error 404 - ${e}` });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) return res.json({ msg: 'Username does not exist' });
    return res.json({ msg: 'User Deleted' });
  } catch (e) {
    return res.json({ msg: `Error 404 - ${e}` });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, password, phoneNumber, address, location, zipCode } =
    req.body;

  try {
    const userBD = await User.findOne({ email });
    if (userBD) return res.json({ msg: 'The email already exists' });
    const usernameBD = await User.findOne({ username });
    if (usernameBD) return res.json({ msg: 'The username already exists' });

    if (!password) {
      const updatedUser = await User.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updatedUser) return res.json({ msg: 'The user was not found' });
      return res.json({ msg: 'User Updated' });
    } else {
      const passwordHash = await encrypt(password);

      const updatedUser = await User.findByIdAndUpdate(
        id,
        {
          username: username,
          password: passwordHash,
          email: email,
          phoneNumber: phoneNumber,
          address: address,
          location: location,
          zipCode: zipCode,
        },
        {
          new: true,
        }
      );

      return res.json({ msg: 'User Updated' });
    }
  } catch (e) {
    return res.json({ msg: `Error 404 - ${e}` });
  }
};

export const updateWishList = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).send('User not found');
    }
    user.wishList.unshift(req.body);
    user.save();
    return res.json(user);
  } catch (e) {
    return res.json({ msg: `Error 400 - ${e}` });
  }
};

export const deleteWishList = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).send('User not found / deleteWishList');
    }
    user.wishList = user.wishList.filter((e) => e._id !== req.body.id);
    user.save();
    return res.json(user);
  } catch (e) {
    return res.json({ msg: `Error 400 - ${e}` });
  }
};

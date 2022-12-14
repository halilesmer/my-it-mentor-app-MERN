import { encryptPassword, verifyPassword } from "../util/encryptPassword.js";

import MentorsModel from "../models/mentorsModel.js";
import { v2 as cloudinary } from "cloudinary";
import { issueToken } from "../util/jwt.js";

const uploadUserPicture = async (req, res) => {
  console.log("req.boy", req.boy);

  try {
    console.log("req.file :>> ", req.file); //Multer is storing the file in that property(objec) of the request object
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "my-it-mentor/mentors",
    });
    console.log("uploadResult", uploadResult); //this show us the object with all the information about the upload, including the public URL in result.url
    res.status(200).json({
      message: "Image upload succesfull",
      imageUrl: uploadResult.url,
    });
    console.log("Image upload succesfull");
  } catch (error) {
    res
      .status(500)
      .json({ message: "image couldn't be uploaded", error: error });
  }
};

const signUp = async (req, res) => {
  console.log("req.body: ", req.body);

  try {
    const existingUser = await MentorsModel.findOne({ email: req.body.email });
    if (existingUser) {
      res.status(409).json({ msg: "user allready exists" });
      console.log("user allready exists: ");
    } else {
      console.log("user doesn't exist... ");
      //use here express validator

      const hashedPassword = await encryptPassword(req.body.password);

      const newUser = new MentorsModel({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        birthday: req.body.birthday,
        gender: req.body.gender,
        language: req.body.language,
        experience: req.body.experience,
        website: req.body.website,
        fee: req.body.fee,
        couching_medium: req.body.couching_medium,
        email: req.body.email,
        skills: req.body.skills,
        password: hashedPassword,
        avatar_picture: req.body.avatar_picture,
      });

      try {
        const savedUser = await newUser.save();
        res.status(201).json({
          user: {
            first_name: savedUser.first_name,
            last_name: savedUser.last_name,
            birthday: savedUser.birthday,
            gender: savedUser.gender,
            language: savedUser.language,
            experience: savedUser.experience,
            website: savedUser.website,
            fee: savedUser.fee,
            couching_medium: savedUser.couching_medium,
            email: savedUser.email,
            skills: savedUser.skills,
            password: savedUser.password,
            about: savedUser.about,
            avatar_picture: savedUser.avatar_picture,
          },
        });
      } catch (error) {
        console.log("SavedUser error: ", error);
        res
          .status(401)
          .json({ msg: "registration not possible", error: error });
      }
    }
  } catch (error) {
    console.log("error: ", error);
  }
};

const mentorsSignIn = async (req, res) => {
  const user = await MentorsModel.findOne({ email: req.body.email });
  if (!user) {
    res.status(409).json({
      msg: "User not found.",
    });
  } else {
    console.log("req.body: ", req.body);
    const verifiedPassword = await verifyPassword(
      req.body.password,
      user.password
    );
    if (!verifiedPassword) {
      res.status(409).json({
        msg: "Password is incorrect!",
      });
    } else {
      console.log("You are logged in!");
      console.log("user.id: ", user._id);
      const token = issueToken(user._id, user.user_type);
      res.status(201).json({
        msg: "You are logged in!",
        successful: true,
        user: {
          id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          user_type: user.user_type,
          avatar_picture: user.avatar_picture,
        },

        token,
      });
    }
  }
};

// ------- Get All Mentors ------------------- starts//
const allMentors = async (req, res) => {
  console.log("req.body-allMentors: ", req.body);
  try {
    const response = await MentorsModel.find();
    res.status(200).json(response);
  } catch (error) {
    console.log("error, getting all mentors failed: ", error);
    res.status(400).json({
      msg: "getting all mentors failed:",
      error: error,
    });
  }
};
// ------- Get All Mentors ------------------- ends//

// ------- getMentorsProfile -------------------//
const getMentorsProfile = (req, res) => {
  console.log("req, res in getMentorsProfile: ", req, res);
  console.log("req.user- getMentorsProfile", req.user);

  const { password, ...user } = req.user;

  // res.status(200).json(req.user);
  res.status(200).json({
    _id: req.user.id,
    first_name: req.user.first_name,
    last_name: req.user.last_name,
    email: req.user.email,
    birthday: req.user.birthday,
    gender: req.user.gender,
    language: req.user.language,
    experience: req.user.experience,
    website: req.user.website,
    fee: req.user.fee,
    couching_medium: req.user.couching_medium,
    skills: req.user.skills,
    password: "",
    user_type: req.user.user_type,
    register_Date: req.user.register_Date,
    about: req.user.about,
    likes: req.user.likes,
    avatar_picture: req.user?.avatar_picture,
  });
};

// ------- getSpecificMentorData -------------------//
const getSpecificMentorData = async (req, res) => {
  try {
    // console.log('req.params :>> ', req.params);
    const mentor = await MentorsModel.findById(req.params.mentorId);

    res.status(200).json({
      mentor,
      msg: "Getting specific mentor successful",
    });
  } catch (error) {
    console.log("error getting specific mentor: ", error);
    res.status(400).json({
      msg: "We're sorry, an error occurred during getting mentors data.",
    });
  }
  console.log("req.body- getSpecificMentorData: ", req.body);
};

// ----------- editMentor -------------------//
const editMentor = async (req, res) => {
  // console.log("edit Mentor: req,res: ", req, res);
  console.log("request body:>> ", req.body);
  console.log("req.user- editMentor controller", req.user);
  const hashedPassword = await encryptPassword(req.body.password);
  const update = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    birthday: req.body.birthday,
    gender: req.body.gender,
    language: req.body.language,
    experience: req.body.experience,
    website: req.body.website,
    fee: req.body.fee,
    couching_medium: req.body.couching_medium,
    skills: req.body.skills,
    password: hashedPassword,
    user_type: req.body.user_type,
    register_Date: req.body.register_Date,
    about: req.body.about,
    avatar_picture: req.body?.avatar_picture,
  };

  try {
    // const updateMentor = await mongoose.MentorModel.findOneAndUpdate(id_mentor, )  delete this
    console.log("req.user.id- editMentor controller: ", req.user.id);

    const doc = await MentorsModel.findByIdAndUpdate(req.user.id, update, {
      new: true,
    });

    console.log("doc- editMentor controller: ", doc);
    res.status(200).json({
      msg: "Mentor update successfull",
    });
  } catch (error) {
    console.log("error update mentor: ", error);
    res.status(400).json({
      msg: "Can not update mentor!",
    });
  }
};

// ---------- Delete Mentors Account ----------- starts --//

const deleteAccount = async (req, res) => {
  console.log("req.body- deleteAccount-mentor: ", req.body);
  const mentor = await MentorsModel.findByIdAndDelete(req.body.userId);
  try {
    if (mentor) {
      console.log("Mentor delete account successfully.");
      res.status(200).json({
        msg: "Mentor delete account successfully.",
      });
    } else {
      console.log("Mentor delete account failed");
      res.status(400).json({ msg: "Mentor delete account failed." });
    }
  } catch (error) {
    console.log("error deleting Mentor account: ", error);
    res.status(400).json({
      msg: "error deleting Mentor: ",
      error,
    });
  }
};

const getLikedMentors = async (req, res) => {
  console.log("res: in getLikedMentors: ", res);
  console.log("req.body: in getLikedMentors: ", req.body.mentorId);

  try {
    // const filterMetrs = await MentorsModel.find({_id: '63038402f4076284079263d5'});
    const filterMetrs = await MentorsModel.find({
      _id: {
        $in: req.body.mentorId,
      },
    });

    res.status(200).json(filterMetrs);
    console.log("filterMetrs: ", filterMetrs);
    console.log("get liked mentors result succeed! :");
  } catch (error) {
    console.log(
      "error: get data by gender in getLikedMentors failed!!!: ",
      error
    );
  }
};

export {
  uploadUserPicture,
  signUp,
  allMentors,
  mentorsSignIn,
  getMentorsProfile,
  getSpecificMentorData,
  editMentor,
  deleteAccount,
  getLikedMentors,
};

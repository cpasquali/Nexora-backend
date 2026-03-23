import { Notifications, User } from "../models/Associations.js";

export const getNotifications = async (req, res) => {
  const { user_id } = req.params;
  try {
    const notifications = await Notifications.findAll({
      where: { user_id },
      include: {
        model: User,
        as: "actor",
        attributes: ["image_url", "username"],
      },
    });

    if (notifications.length === 0)
      return res.status(200).json({ notifications: [] });

    return res.status(200).json({ notifications });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateNotifications = async (req, res) => {
  const { user_id } = req.params;
  try {
    await Notifications.update({ is_read: true }, { where: { user_id } });

    const notifications = await Notifications.findAll({
      where: { user_id },
      include: {
        model: User,
        as: "actor",
        attributes: ["image_url", "username"],
      },
    });

    return res.status(200).json({ notifications });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteNotification = async (req, res) => {
  const { user_id, notification_id } = req.params;
  try {
    await Notifications.destroy({
      where: {
        id: notification_id,
        user_id,
      },
    });

    return res
      .status(200)
      .json({ message: "Notification deleted", type: "OK" });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

import Notification from "../Schema/Notification.js"


export const getNotifs = async (req, res) => {
    const userId = req.user;
    
    try {
      // Query to find unread notifications for the user
      const notifs = await Notification.find({user:userId})
        .sort({ createdAt: -1 });
        // { user: userId}
      return res.status(200).json(notifs);
    } catch (error) {
      console.error("Error fetching notifications: ", error);
      return res.status(500).json({ message: "Error fetching notifications" });
    }
  };

  export const markAsRead = async (req, res) => {
    const userId = req.user;
    const { notificationIds } = req.body;
  
    try {
      // Update the 'unread' field to false for the specified notifications
      const result = await Notification.updateMany(
        { user: userId, _id: { $in: notificationIds } },
        { $set: { unread: false } }
      );
  
      return res.status(200).json({ message: 'Notifications marked as read', result });
    } catch (error) {
      console.error("Error marking notifications as read: ", error);
      return res.status(500).json({ message: "Error marking notifications as read" });
    }
  };
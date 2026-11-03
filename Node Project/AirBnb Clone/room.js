// Room Model for StayEZ
class Room {
  constructor(title, location, price, amenities = []) {
    if (typeof title === 'object' && title !== null) {
      this.title = title.title;
      this.location = title.location;
      this.price = title.price;
      this.amenities = title.amenities || [];
    } else {
      this.title = title;
      this.location = location;
      this.price = price;
      this.amenities = amenities;
    }
  }
}

module.exports = Room;

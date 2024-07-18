class DTO {
  static transformCreateHorsePayload(data, userId) {
    return {
      horseName: data.horseName,
      registrationNumber: data.registrationNumber,
      feed: data.feed,
      userId,
      height: Number(data.height),
      weight: Number(data.weight),
      volume: Number(data.volume),
      dob: new Date(data.dob),
      scheduledTime: new Date(data.scheduledTime),
      type: data.type,
      maintenanceSupplements: data.maintenanceSupplements,
    };
  }

  static transformVehicleMaintenanceExpensePayload(data, userId) {
    return {
      userId,
      date: new Date(data.date),
      cost: Number(data.cost),
      mileage: Number(data.mileage),
      repair: data.repair,
    };
  }

  static transformTrailerMaintenanceExpensePayload(data, userId) {
    return {
      userId,
      date: new Date(data.date),
      cost: Number(data.cost),
      mileage: Number(data.mileage),
      repair: data.repair,
    };
  }
}

module.exports = DTO;

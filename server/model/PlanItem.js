const approvedTypes = {
  food: true,
  exercise: true,
};

class PlanItem {
  constructor(details) {
    this.user = details.user ? `${details.user}` : null;
    this.date = details.date ? new Date(details.date) : null;
    this.type = details.type
      && approvedTypes[details.type]
      ? `${details.type}`
      : null;
    this.category = details.category ? `${details.category}` : null;
    if (this.type === 'food') {
      this.items = details.items ? details.items.map(item => `${item}`) : null;
    }
    else if (this.type === 'exercise') this.item = details.item ? `${details.item}` : null;
    this.notes = `${details.notes || ''}`;
    this.done = details.done === true ? true : false;
  }

  isValidItem() {
    let isValid = false;
    if (this.user
      && this.date
      && this.type
      && this.category
      && (
        (this.type === 'food'
          && this.items
          && this.items.length)
        || (this.type === 'exercise'
          && this.item)
      )
    ) isValid = true;
    return isValid;
  }
}

module.exports = PlanItem;
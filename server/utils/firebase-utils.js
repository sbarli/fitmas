const processFirebaseDoc = doc => ({
  id: doc.id,
  ...doc.data(),
});

module.exports = {
  processFirebaseDoc,
};
const boom = async () => {
  fireworks = await getFireworks();
  const trigger = await setUpFireworks(fireworks);
  return trigger;
};

const boom = () => {
  getFireworks().then((res) => {
    setUpFireworks(res).then((trigger) => {
      return trigger;
    });
  });
};






<div>
  <div className="form-group col-lg-10 mt-1">
    <label className="text-muted">Görsel dosyası seç</label>
    <input
      className="form-control"
      onChange={handlePhoto}
      type="file"
      name="photo"
      accept="image/*"
      multiple
    />
  </div>

  <div className="form-group col-lg-10">
    <textarea
      onChange={icerikHandle}
      value={icerik}
      className="form-control"
      rows="5"
    ></textarea>
  </div>
</div>;

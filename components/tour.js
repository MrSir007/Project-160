AFRAME.registerComponent('tour', {
  schema: {
    state: {type: 'string', default: 'places-list'},
    selectedCard: {type: 'string', default: '#card_1'}
  },
  init: function() {
    this.placesContainer = this.el
    this.camera = document.querySelector("#camera");
    this.createCards()
  },
  createCards: function() {
    const imageRef = {
      garden: {
        position: { x: 20, y: -4.5, z: -5.5 },
        rotation: { x: 0, y: -90, z: 0 },
        src: "assets/thumbnails/garden.png",
        title: "Garden",
        id: "garden"
      },
      main_gate: {
        position: { x: 4.6, y: -5.5, z: 25 },
        rotation: { x: 180, y: 0, z: 0 },
        src: "assets/thumbnails/main_gate.png",
        title: "Main Gate",
        id: "main_gate"
      },
      home: {
        position: { x: -9, y: 34, z: -100 },
        rotation: { x: 0, y: 0, z: 0 },
        src: "assets/thumbnails/home.png",
        title: "My Home",
        id: "home"
      }
    }
 
    for (var key of imageRef) {
      const item = imageRef[key];
      const images = this.createImage(item);
      const title = this.createTitle(item);
      images.appendChild(title);
      this.placesContainer.appendChild(images);
    }
  },
  createImage: function(item) {
    const entity_l = document.createElement("a-entity");
    const id = `place-${item.id}`;
    entity_l.setAttribute("visible", true);
    entity_l.setAttribute("id", id);
    entity_l.setAttribute("geometry", {
      primitive: "circle",
      radius: 3
    });
    entity_l.setAttribute("position", item.position);
    entity_l.setAttribute("rotation", item.rotation);
    entity_l.setAttribute("material", { src: item.src, opacity: 0.6 });
    entity_l.setAttribute("cursor-listener", {});
    return entity_l;
  },
  createTitle: function(item) {
    const entity_1 = document.createElement("a-entity");
    const id = `title-${item.id}`;
    entity_1.setAttribute("text", {
      font: "exo2bold",
      align: "center",
      width: 50,
      color: "#e91e63",
      value: item.title
    })
    const position = { x: 0, y: -4, z: 0 };
    entity_1.setAttribute("position", position);

    if (item.title === "Main Gate") {
      entity_1.setAttribute("rotation", { x: 180, y: 180, z: 0 });
      entity_1.setAttribute("position", { x: 0, y: 4, z: 0 });
    }
    entity_1.setAttribute("visible", true);
    return entity_1
  },
  showView: function() {
    const { selectedPlace } = this.data
    const sky_l = document.querySelector("#main-container");
    sky_l.setAttribute("material", {
      src: `./assets/360_images/${selectedPlace}.jpg`,
      color: "#fff"
    })
  },
  update: function() {
    window.addEventListener("keydown", e => {
      if (e.key === "ArrowUp") {
        if (this.data.zoomAspectRatio <= 10) {
          this.data.zoomAspectRatio += 0.002;
          this.cameraEl.setAttribute("zoom", this.data.zoomAspectRatio);
        }
      }
      if (e.key === "ArrowDown") {
        if (this.data.zoomAspectRatio > 1) {
          this.data.zoomAspectRatio -= 0.002;
          this.cameraEl.setAttribute("zoom", this.data.zoomAspectRatio);
        }
      }
    });
  }
})
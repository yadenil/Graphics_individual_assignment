import * as THREE from "three";

export function createProduct(scene) {
  const group = new THREE.Group();

  // Colors for parts
  const colors = {
    seat: 0x0a0f2c, // Dark Blue
    legs: 0x101522, // Almost Black with Blue Tint
    backrest: 0x1a2233, // Blue-Black
  };

  // Materials with physical properties for realism
  const seatMat = new THREE.MeshPhysicalMaterial({
    color: colors.seat,
    roughness: 0.6,
    metalness: 0.1,
  });
  const legMat = new THREE.MeshPhysicalMaterial({
    color: colors.legs,
    roughness: 0.7,
    metalness: 0.2,
  });
  const backrestMat = new THREE.MeshPhysicalMaterial({
    color: colors.backrest,
    roughness: 0.5,
    metalness: 0.1,
  });

  // Seat (box)
  const seat = new THREE.Mesh(new THREE.BoxGeometry(2, 0.2, 2), seatMat);
  seat.position.y = 1;
  seat.name = "Seat";
  seat.castShadow = true;
  seat.receiveShadow = true;
  group.add(seat);

  // Legs (cylinders)
  const legGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1);
  const legPositions = [
    [-0.8, 0.5, -0.8],
    [0.8, 0.5, -0.8],
    [-0.8, 0.5, 0.8],
    [0.8, 0.5, 0.8],
  ];

  legPositions.forEach((pos, i) => {
    const leg = new THREE.Mesh(legGeometry, legMat);
    leg.position.set(...pos);
    leg.name = `Leg ${i + 1}`;
    leg.castShadow = true;
    leg.receiveShadow = true;
    group.add(leg);
  });

  // Backrest (box)
  const backrest = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 0.2),
    backrestMat
  );
  backrest.position.set(0, 2, -0.9);
  backrest.name = "Backrest";
  backrest.castShadow = true;
  backrest.receiveShadow = true;
  group.add(backrest);

  scene.add(group);

  return group;
}

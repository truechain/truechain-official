/**
 * @author Felix Cai / http://github.com/tari404
 *
 */

import * as THREE from 'three'

export default class InstancedPointsGeometry extends THREE.InstancedBufferGeometry {
  constructor (radius = 1, segments = 8) {
    super()

    segments = Math.max(segments, 3)
    const dAngle = Math.PI * 2 / segments

    const positions = []
    for (let i = 0; i < segments; i++) {
      positions.push(radius * Math.cos(dAngle * i), radius * Math.sin(dAngle * i), 0)
    }

    const index = []
    for (let i = 0; i < segments - 2; i++) {
      index.push(0, i + 1, i + 2)
    }

    this.setIndex(index)
    this.addAttribute('position', new THREE.Float32BufferAttribute(positions, 3))

    this.type = 'InstancedPointsGeometry'
    this.positionsArray = []
  }

  static get isInstancedPointsGeometry () {
    return true
  }

  setPositions (array) {
    this.positionsArray = array
    var pos = new Float32Array(array)

    this.addAttribute('instancePos', new THREE.InstancedBufferAttribute(pos, 3))

    this.computeBoundingBox()
    this.computeBoundingSphere()

    return this
  }

  applyMatrix (matrix) {
    var pos = this.attributes.instancePos

    if (pos !== undefined) {
      matrix.applyToBufferAttribute(pos)
      pos.data.needsUpdate = true
    }

    if (this.boundingBox !== null) {
      this.computeBoundingBox()
    }

    if (this.boundingSphere !== null) {
      this.computeBoundingSphere()
    }

    return this
  }

  fromWireframeGeometry (geometry) {
    this.setPositions(geometry.attributes.position.array)
    return this
  }

  fromEdgesGeometry (geometry) {
    this.setPositions(geometry.attributes.position.array)
    return this
  }

  fromMesh (mesh) {
    this.fromWireframeGeometry(new THREE.WireframeGeometry(mesh.geometry))
    // set colors, maybe
    return this
  }

  fromLineSegements (lineSegments) {
    var geometry = lineSegments.geometry

    if (geometry.isGeometry) {
      this.setPositions(geometry.vertices)
    } else if (geometry.isBufferGeometry) {
      this.setPositions(geometry.position.array) // assumes non-indexed
    }
    // set colors, maybe
    return this
  }

  computeBoundingBox () {
    if (this.boundingBox === null) {
      this.boundingBox = new THREE.Box3()
    }
    const pos = this.attributes.instancePos
    if (pos !== undefined) {
      this.boundingBox.setFromBufferAttribute(pos)
    }
  }

  computeBoundingSphere () {
    if (this.boundingSphere === null) {
      this.boundingSphere = new THREE.Sphere()
    }

    if (this.boundingBox === null) {
      this.computeBoundingBox()
    }

    const vector = new THREE.Vector3()

    var pos = this.attributes.instancePos

    if (pos !== undefined) {
      var center = this.boundingSphere.center

      this.boundingBox.getCenter(center)

      var maxRadiusSq = 0

      for (var i = 0, il = pos.count; i < il; i++) {
        vector.fromBufferAttribute(pos, i)
        maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(vector))
      }

      this.boundingSphere.radius = Math.sqrt(maxRadiusSq)

      if (isNaN(this.boundingSphere.radius)) {
        console.error('PointsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.', this)
      }
    }
  }

  toJSON () {
    // TODO
  }

  clone () {
    const other = new this.constructor()
    if (this.positionsArray.length) {
      other.setPositions(this.positionsArray)
    }
    return other
  }

  copy (source) {
    // TODO
    return this
  }
}

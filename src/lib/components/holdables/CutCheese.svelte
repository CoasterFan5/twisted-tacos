<script lang="ts">
	import { T } from '@threlte/core';
</script>

<T.Group>
	<T.Group>
		<T.Mesh>
			<T.BoxGeometry args={[0.1, 0.1, 0.2]} />
			<T.MeshBasicMaterial color="#FFD766" />
		</T.Mesh>
		<T.Mesh rotation={[0, 1, 1]} position={[0.2, 0, 0]}>
			<T.BoxGeometry args={[0.1, 0.1, 0.2]} />
			<T.MeshBasicMaterial color="#FFD766" />
		</T.Mesh>
		<T.Mesh rotation={[0, 3, 0]} position={[-0.2, 0, -0.2]}>
			<T.BoxGeometry args={[0.1, 0.1, 0.2]} />
			<T.MeshBasicMaterial color="#FFD766" />
		</T.Mesh>
		<T.Mesh rotation={[2, 3, 0]} position={[-0.2, 0, 0.2]}>
			<T.BoxGeometry args={[0.1, 0.1, 0.3]} />
			<T.MeshBasicMaterial color="#FFD766" />
		</T.Mesh>
		<T.Mesh rotation={[0, -3, 0]} position={[0.2, 0, 0.2]}>
			<T.BoxGeometry args={[0.1, 0.1, 0.3]} />
			<T.MeshBasicMaterial color="#FFD766" />
		</T.Mesh>
	</T.Group>
	<T.Group position={[0, 0, 0]} rotation={[0, -4, 0]} scale={0.8}>
		<T.Mesh>
			<T.BoxGeometry args={[0.1, 0.1, 0.2]} />
			<T.MeshBasicMaterial color="#FFD766" />
		</T.Mesh>
		<T.Mesh rotation={[0, 1, 1]} position={[0.2, 0, 0]}>
			<T.BoxGeometry args={[0.1, 0.1, 0.2]} />
			<T.MeshBasicMaterial color="#FFD766" />
		</T.Mesh>
		<T.Mesh rotation={[0, 3, 0]} position={[-0.2, 0, -0.2]}>
			<T.BoxGeometry args={[0.1, 0.1, 0.2]} />
			<T.MeshBasicMaterial color="#FFD766" />
		</T.Mesh>
		<T.Mesh rotation={[2, 3, 0]} position={[-0.2, 0, 0.2]}>
			<T.BoxGeometry args={[0.1, 0.1, 0.3]} />
			<T.MeshBasicMaterial color="#FFD766" />
		</T.Mesh>
		<T.Mesh rotation={[0, -3, 0]} position={[0.2, 0, 0.2]}>
			<T.BoxGeometry args={[0.1, 0.1, 0.3]} />
			<T.MeshBasicMaterial color="#FFD766" />
		</T.Mesh>
	</T.Group>
</T.Group>

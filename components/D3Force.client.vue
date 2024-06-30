<script setup>
import * as d3 from "d3";

const props = defineProps({
    nodes: Array,
    links: Array,
    radius: {
        type: Number,
        default: 5
    },
    distance: {
        type: Number,
        default: 30
    }
});

const svgRef = ref(null);

onUpdated(() => {
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const links = props.links.map(d => ({...d}));
    const nodes = props.nodes.map(d => ({...d}));

    const simulation = d3.forceSimulation(nodes)
        .force(
            "link",
            d3.forceLink(links)
                .id(d => d.id)
                .distance(props.distance)
        )
        .force("charge", d3.forceManyBody().strength(-2500))
        .force("x", d3.forceX())
        .force("y", d3.forceY());

    const svg = d3.select(svgRef.value);

    const link = svg.append("g")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("stroke-width", d => Math.sqrt(d.value));

    const group = svg.append("g")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
        .selectAll("g")
        .data(nodes)
        .join("g");

    const node = group.append("circle")
        .attr("r", props.radius)
        .attr("fill", d => color(d.group));

    const text = group.append("text")
        .text(d => d.title)
        .attr("text-anchor", "middle")
        .attr("dy", 36)
        .attr("stroke", "black")
        .attr("stroke-width", 0.5)
        .attr("class", "pointer-events-none");

    node.call(d3.drag()
        .on("start", dragStarted)
        .on("drag", dragged)
        .on("end", dragEnded));

    simulation.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);

        text
            .attr("x", d => d.x)
            .attr("y", d => d.y);
    });

    function dragStarted(event) {
        if (!event.active)
            simulation.alphaTarget(0.3).restart();

        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
    }

    function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
    }

    function dragEnded(event) {
        if (!event.active)
            simulation.alphaTarget(0);

        event.subject.fx = null;
        event.subject.fy = null;
    }
});
</script>

<template>
    <div>
        <svg ref="svgRef"
             width="928"
             height="680"
             viewBox="-464,-340,928,680"
             class="max-w-full h-auto"></svg>
    </div>
</template>

<style scoped>

</style>
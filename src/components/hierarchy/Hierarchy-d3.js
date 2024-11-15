import * as d3 from 'd3'

class HierarchyD3 {
    margin = {top: 100, right: 5, bottom: 5, left: 100};
    size;
    height;
    width;
    hierSvg;
    colorScale;
    // add specific class properties used for the vis render/updates
    // cellSize= 34;
    // radius = this.cellSize / 2;
    // colorScheme = d3.schemeYlGnBu[9];
    // cellColorScale = d3.scaleQuantile(this.colorScheme);
    // cellSizeScale = d3.scaleLinear()
    //     .range([2, this.radius-1])
    // ;


    // the constructor takes the element to add the SVG within it
    constructor(el){
        this.el=el;
    };

    create = function (config) {
        this.size = {width: config.size.width, height: config.size.height};

        // adapt the size locally if necessary
        // e.g. to create a square svg
        // if (this.size.width > this.size.height) {
        //     this.size.width = this.size.height;
        // } else {
        //     this.size.height = this.size.width;
        // }

        // get the effect size of the view by subtracting the margin
        this.width = this.size.width - this.margin.left - this.margin.right;
        this.height = this.size.height - this.margin.top - this.margin.bottom;

        // initialize the svg and keep it in a class property to reuse it in renderMatrix()
        this.hierSvg=d3.select(this.el).append("svg")
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom)
            .append("g")
            .attr("class","matSvgG")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
        ;


    }

    updateFunction1(selection){
        // transform selection
        // selection.attr("transform", (itemData)=>{
        //      // use scales to return shape position from data values
        // })

        // change sub-element
        // selection.select(".classname")
        //    .attr("fill",(itemData)=>{
        //          // use scale to return visual attribute from data values
        //    })
    }


    renderVis = function (visData, controllerMethods){
        // build d3 hierarchy from vidData
        let hierarchy = {}
        if (visData?.cluster_tree){
            let root=visData.cluster_tree
            // let N = visData.cluster_tree.length+1;  // Your n_samples/corpus size.
            // let root = d3.stratify()
            //     .id((d,i) => i + N)
            //     .parentId((d, i) => {
            //         var parIndex = visData.cluster_tree.findIndex(e => e.includes(i + N));
            //         if (parIndex < 0) {
            //             return; // The root should have an undefined parentId.
            //         }
            //         return parIndex + N;
            //     })(visData.cluster_tree); // Your children_
            this.colorScale = d3.scaleOrdinal(d3.schemeObservable10).domain(visData.categories)
            const colorByTrueCateg =  (d)=>{
                const countByCateg = d.data.count_by_categ
                let indexMax=-1;
                let countMax=Number.NEGATIVE_INFINITY;
                countByCateg.forEach((d,i)=>{
                    if (d>countMax){
                        countMax = d;
                        indexMax = i;
                    }
                })
                return d.data.count_by_categ?this.colorScale(indexMax):"black";
            };
            const colorByClusterCut= (d) =>{
                return d.data.category_dist_cut!==undefined?this.colorScale(d.data.category_dist_cut):"black";
            }
            // const linkColorFunction = colorByTrueCateg;
            const linkColorFunction = colorByClusterCut;
            // const nodeColorFunction = colorByTrueCateg;
            const nodeColorFunction = colorByClusterCut;
            hierarchy = d3.hierarchy(root);
            const cluster = d3.cluster().size([this.width,this.height]);
            cluster(hierarchy)
            // function diagonal(d) {
            //     return "M" + d.y + "," + d.x
            //         + "C" + (d.parent.y + 100) + "," + d.x
            //         + " " + (d.parent.y + 100) + "," + d.parent.x
            //         + " " + d.parent.y + "," + d.parent.x;
            // }
            var link = this.hierSvg.selectAll(".link")
                .data(hierarchy.descendants().slice(1), (d)=>d.node_id)
                .enter()
                // .append("path")
                // .attr("class", "link")
                // .attr("d", diagonal)
                .append("line")
                .attr("class", "link")
                .attr("x1", (d)=>d.x)
                .attr("y1", (d)=>d.y)
                .attr("x2", (d)=>d.parent.x)
                .attr("y2", (d)=>d.parent.y)
                .attr("stroke",linkColorFunction)
                // .style("opacity",0.3)
            ;
            var node = this.hierSvg.selectAll(".node")
                .data(hierarchy.descendants(),(d)=>d.node_id)
                .enter().append("g")
                .attr("class", function(d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
                .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

            node.append("circle")
                .attr("r", 1)
                .attr("fill",nodeColorFunction)
            ;
            node.append("text")
                .attr("dy", 3)
                .attr("x", function(d) { return d.children ? -8 : 8; })
                .style("text-anchor", function(d) { return d.children ? "end" : "start"; })
                .text(function(d) { return d.node_id; });

        }

        // build the size scale from the data
        // const minVal =
        // const maxValo =
        // this.scale1.domain([minVal, maxVal])


        // this.matSvg.selectAll(".itemG")
        //     // all elements with the class .cellG (empty the first time)
        //     .data(visData,(itemData)=>itemData.index)
        //     .join(
        //         enter=>{
        //             // all data items to add:
        //             // doesn’exist in the select but exist in the new array
        //             const itemG=enter.append("g")
        //                 .attr("class","itemG")
        //                 .on("event1", (event,itemData)=>{
        //                     controllerMethods.handleOnEvent1(itemData);
        //                 })
        //                 .on("event2",(event,itemData)=>{
        //                     controllerMethods.handleOnEvent2(itemData);
        //                 })
        //             ;
        //             // render element as child of each element "g"
        //             itemG.append("shape")
        //             // ...
        //             ;
        //             this.updateFunction1(itemG);
        //         },
        //         update=>{this.updateFunction1(update)},
        //         exit =>{
        //             exit.remove()
        //             ;
        //         }
        //
        //     )
    }

    clear = function(){
        d3.select(this.el).selectAll("*").remove();
    }
}
export default HierarchyD3;
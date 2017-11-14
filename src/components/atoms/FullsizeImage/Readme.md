### FullsizeImage

this component will be used for containers with a fixed height and width that should be covered by an image. for this project, this component will be used for the homepage and page headers.

#### example 

this example shows the resizing behaviour of this component.

    <div style={{'width': '200px', 
                'height': '200px', 
                resize: 'both', 
                overflow:'auto'}}>
        <FullsizeImage src="https://unsplash.it/1280/720">
        </FullsizeImage>
    </div>
Standard LanguageSelection
    
    <div style={{backgroundColor: '#666'}}>
	    <LanguageSelection/>
	    <LanguageSelection dark={true}/>
    </div>

LanguageSelection with options
	
	<div style={{backgroundColor: '#666'}}>
	    <LanguageSelection 
			dark={false}
			languages={[
	    	{lang: 'de', label: 'de'},
	    	{lang: 'en', label: 'en'},
	    	{lang: 'fr', label: 'fr'},
	    	]}/>
		<LanguageSelection 
			dark={true}
			languages={[
	    	{lang: 'de', label: 'de'},
	    	{lang: 'en', label: 'en'},
	    	{lang: 'fr', label: 'fr'},
	    	]}/>
    </div>	
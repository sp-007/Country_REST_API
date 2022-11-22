const Link = ReactRouterDOM.Link,
      Route = ReactRouterDOM.Route,
      HashRouter = ReactRouterDOM.HashRouter,
    //   useSearchParams = ReactRouterDOM.useSearchParams,
      useState = React.useState,
      useEffect =React.useEffect;

{/*.................................................................*/}

function Header(props)
{
    var src="./main/images/light.png";
    var el="light light-el light-sh";
    var txt ="Dark Mode";
    var txt2="dark";
    if(props.modeClass=="dark")
    {
        src="./main/images/dark.png";
        el="dark dark-el dark-sh";
        txt="Light Mode";
        txt2="light";
    }
    return (
        <div id="header" className={el}>
                <h1>Where in the world?</h1>
            <div>
                <span onClick={()=>{props.setMode(txt2);}}>                
                    <img src={src}/>
                    &nbsp;{txt}
                </span>
            </div>
        </div>
    );
}

{/*.................................................................*/}

function Section(props)
{
    const [search , changeSearch]= useState(()=>"");
    const setSearch=(data)=>changeSearch(search => data);
    const [filter , changeFilter]= useState(()=>"");
    const setFilter=(data)=>changeFilter(filter => data);
    var src="./main/images/light.png";
    var el="light light-el light-sh";
    var bg="light light-bg";
    if(props.modeClass=="dark")
    {
        src="./main/images/dark.png";
        el="dark dark-el dark-sh";
        bg="dark dark-bg";
    }
        return (
        <div className={bg}> 
            <div  id="section">
            <Search modeClass={props.modeClass} setSearch={setSearch} search={search}/> 
            <Filter modeClass={props.modeClass} setFilter={setFilter} filter={filter}/>
            </div> 
            <Result modeClass={props.modeClass} search={search} filter={filter} data={props.data}/>     
        </div>
        );     
}
{/*..................................................................................*/}

function Search(props)
{
    var src="./main/images/search-light.png";
    var outer="light-el light-sh";
    var input="light light-el";
    if(props.modeClass=="dark")
    {
        src="./main/images/search-dark.png";
        outer="dark-el dark-sh";
        input="dark dark-el";
    }
    const action=(e)=>{ 
        props.setSearch(e.target.value);
    }
    return(
        <div id="search" className={outer}>
            <img src={src}/>
            <input id="inp" className={input} placeholder="Search for country..." onChange={(e)=>{action(e)}}/>
        </div>
    );
}

{/*............................................................................................*/}

function Filter(props)
{
    var src="./main/images/down-light.png";
    var outer="light-el light-sh";
    var input="light light-el";
    if(props.modeClass=="dark")
    {
        src="./main/images/down-dark.png";
        outer="dark-el dark-sh";
        input="dark dark-el";
    }
    const action=()=>{
            const element=document.getElementById("menu-list");
            if(element.classList.contains("show"))
            {
                element.classList.remove("show");
                element.classList.add("hide");
            }
            else
            {
                element.classList.remove("hide");
                element.classList.add("show");
            }
    }
    return(
        <div id="menu">
        <div id="filter" className={outer} onClick={()=>{action();}}>
        <span>{(props.filter=="")?"Filter by Region":props.filter}</span>
            <img src={src}/>
        </div>
        <ul id="menu-list" type="none" className={outer+" hide"}>
            <li onClick={()=>{action(); props.setFilter("asia")}}>Asia</li>
            <li onClick={()=>{action(); props.setFilter("africa")}}>Africa</li>
            <li onClick={()=>{action(); props.setFilter("americas")}}>Americas</li>
            <li onClick={()=>{action(); props.setFilter("europe")}}>Europe</li>
            <li onClick={()=>{action(); props.setFilter("polar")}}>Polar</li>
            <li onClick={()=>{action(); props.setFilter("antarctic ocean")}}>Antarctic Ocean</li>
            <li onClick={()=>{action(); props.setFilter("oceania")}}>Oceania</li>
        </ul>
    </div>
    );
}
{/*...................................................................................*/}

function Result(props)
{   
    var outer="light light-el light-sh";
    if(props.modeClass=="dark")
    {
        outer="dark dark-el dark-sh";
    }
    var search=(props.search).toLowerCase();
    var filter=(props.filter).toLowerCase();
    var len=search.length;
    var count=-1;
    return(
        <div id="result">
        <HashRouter>
            {props.data.map((country)=>{
                count++;
                var name=(country.name).toLowerCase();
                var region=(country.region).toLowerCase();
                if(name.length>=len&&name.substring(0,len)==search)
                {  
                    if((filter!=""&&filter==region)||filter=="") 
                    {     
                return(
            <Link to={`/detail?index=${count}`} key={count} className={outer+" card"}>
                    <div className="card-img">
                        <img src={country.flags.svg}/>
                    </div>
                    <div className="card-details">
                        <div className="card-title"><b>{country.name}</b></div>
                        <span className="country-details">
                            <div><b>Population:</b>&nbsp;{country.population}</div>
                            <div><b>Region:</b>&nbsp;{country.region}</div>
                            <div><b>Capital:</b>&nbsp;{country.capital}</div>
                        </span>
                    </div>
            </Link>);}
            }})}
        </HashRouter>
        </div>
    );
}

{/*...................................................................................*/}

function Detail(props)
{
    var src="./main/images/arrow-light.png";
    var el="light light-el light-sh";
    var bg="light light-bg";
    if(props.modeClass=="dark")
    {
        src="./main/images/arrow-dark.png";
        el="dark dark-el dark-sh";
        bg="dark dark-bg";
    }

    return(
        <div id="section-detail" className={bg}>
            <HashRouter>
                <Link to="/"><div id="back" className={el}><img src={src} />&nbsp;<span>Back</span></div></Link>
            </HashRouter> 
            <Info data={props.data}/>                   
        </div> 
    );
}
{/*...................................................................................*/}

function Info(props)
{        
    const str=(window.location.href).toLowerCase();
    const n=parseInt((str.substring(str.lastIndexOf("=")+1,str.length)));
    if(n>-1&&n<props.data.length)
    {
    const data=props.data[n]  
       var cur_list="";
       data.hasOwnProperty("currencies")? 
        data.currencies.map((cur)=>{
            cur_list=cur_list+(cur.name)+" , "; })
        :cur_list="N/A , ";        
        cur_list=cur_list.substring(0,cur_list.length-2);
        var lang_list="";
        data.hasOwnProperty("languages")? 
            data.languages.map((lang)=>{
                lang_list=lang_list+lang.name+" , ";})
            :lang_list="N/A , ";
        lang_list=lang_list.substring(0,lang_list.length-2);
    return(
    <div>
        <img src={data.flags.svg}></img>
        <div>
            <h1>{data.name}</h1>
            <div>
                <ul>
                    <li>Official Name: {data.hasOwnProperty("nativeName")? data.nativeName:"N/A"}</li>
                    <li>Population: {data.hasOwnProperty("population")? data.population:"N/A"}</li>
                    <li>Region: {data.hasOwnProperty("region")? data.region:"N/A"}</li>
                    <li>Sub Region: {data.hasOwnProperty("subregion")? data.subregion:"N/A"}</li>
                    <li>Capital: {data.hasOwnProperty("capital")? data.capital:"N/A"}</li>
                </ul>
                <ul>
                    <li>topLevelDomain: {data.hasOwnProperty("topLevelDomain")?data.topLevelDomain:"N/A"}</li>                    
                    <li>Currencies: {cur_list}</li>                    
                    <li>Languages:{lang_list}</li>
                </ul>
            </div>
            <div>
                <span>Border Countries: </span> 
                    <span> 
                    {   data.hasOwnProperty("borders")?
                        <Border modeClass={props.modeClass} data={props.data} border={data.borders}/>
                        :
                        "none"
                    }
                    </span>  
            </div>                    
        </div>
    </div>
    );
                }
                else
                return<h1>Wrong Query</h1>
}

function Border(props){
    var count=-1;
    var go=false;

    return(
    <HashRouter>
        <ul>
            {
            props.data.map((country)=>{
            count++;                    
            for (var i = 0; i < props.border.length; i++)
            { 
                if(country.alpha3Code==props.border[i])
                {
                    go=true;
                    break;
                }
            }
            if(go)
            {
            go=false;                    
            console.log(country.alpha3Code+" "+props.border[i]);
            return (<li key={count}><Link to={"/detail?index="+count}>{country.name}</Link></li>);
            }
            })
            }
        </ul>
    </HashRouter>);
}
function BorderTab(props)
{
    
}
{/*...................................................................................*/}

function Data()
{
    const[data,setData]=useState([]);
    useEffect(() => {
        fetch("https://restcountries.com/v2/all?fields=name,nativeName,alpha3Code,borders,capital,currencies,topLevelDomain,population,region,subregion,languages,flags")
        .then(response => response.json())
        .then(json=> {setData(()=>json);
        })}, []);
    if(data!=undefined&&data.length>0)
    return (<App data={data}/>);
}
function App(props)
{  
    const [mode , changeMode]= useState(()=>"light");
    const setMode=(tmp)=>changeMode(mode => tmp);
    return(   
        <div> 
        <Header modeClass={mode} setMode={setMode}/>
        <HashRouter>
            <Route path="/" exact component={()=><Section modeClass={mode} data={props.data}/>}/>
            <Route path="/detail"  component={()=><Detail modeClass={mode} data={props.data}/>}/>
        </HashRouter>
        </div> 
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Data />)
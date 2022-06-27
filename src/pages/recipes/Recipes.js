import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { projectFirestore } from '../../firebase/config';

//Styles
import './Recipes.css';

export default function Recipes ()
{
    const { id } = useParams();
    const { mode } = useTheme();

    const [ recipe, setRecipe ] = useState( null );
    const [ isPending, setIsPending ] = useState( false );
    const [ error, setError ] = useState( false );

    useEffect( () =>
    {
        setIsPending( true );

        const unsub = projectFirestore.collection( 'recipes' ).doc( id ).onShapshot( ( doc ) =>
        {
            if ( doc.exists )
            {
                setIsPending( false );
                setRecipe( doc.data() );
            }
            else
            {
                setIsPending( false );
                setError( "Could not find that recipe" );
            }
        } )
        return () => unsub();
    }, [ id ] );

    const handleClick = () =>
    {
        projectFirestore.collection( 'recipes' ).doc( id ).update(
            {
                title: "New Title"
            } )
    }

    return (
        <div className={ `recipe ${ mode }` }>
            { error && <p className="error">{ error }</p> }
            { isPending && <p className="loading">Loading...</p> }
            { recipe && (
                <>
                    <h2 className="page title">{ recipe.title }</h2>
                    <p>Takes { recipe.cookingTime } to make.</p>
                    <ul>
                        { recipe.ingredients.map( ing => <li key={ ing }>{ ing }</li> ) }
                    </ul>
                    <p className='method'>{ recipe.method }</p>
                    <button onClick={ handleClick }>Update Me!</button>
                </>
            ) }
        </div>
    )
}
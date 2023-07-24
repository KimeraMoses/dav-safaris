import { Chip, Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import classes from "./NewKeyWord.module.css";
import React, { useEffect, useState } from "react";

const NewKeyWord = (props) => {
  const { setKeys, key_words } = props;
  const [newWord, setNewWord] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [index, setIndex] = useState("");

  useEffect(() => {
    let Pkeys = key_words;
    if (Pkeys?.length) {
      setWords([...words, ...Pkeys]);
      setKeys([...words, ...Pkeys]);
    }

    // eslint-disable-next-line
  }, [key_words]);

  const [words, setWords] = useState([]);

  const handleClick = (word, index) => {
    setNewWord(word);
    setIndex(index);
    setIsEdit(true);
  };

  const updateRow = (e) => {
    e.preventDefault();
    let new_Word = words[index];
    new_Word = newWord;
    words[index] = new_Word;
    setWords([...words]);
    setKeys([...words]);
    setIsEdit(false);
    setNewWord("");
  };

  const addRow = (e) => {
    e.preventDefault();
    let newEntry = newWord;
    if (newWord) {
      setWords([...words, newEntry]);
      setKeys([...words, newEntry]);
    }
    setNewWord("");
  };

  const deleteRow = (id) => {
    let copy_word = [...words];
    if (!id) return;
    copy_word.splice(id, 1);
    setWords(copy_word);
    setKeys(copy_word);
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      justifyContent: "flex-start",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(0.5),
      },
    },
  }));
  const styles = useStyles();

  return (
    <div className={classes.keyword_wrapper}>
      <h5>Key Words</h5>
      <div className={styles.root}>
        {words.length > 0 &&
          words.map((word, index) => (
            <Tooltip
              title={`Click to edit ${word}`}
              placement="top"
              arrow={true}
            >
              <Chip
                onClick={() => handleClick(word, index)}
                key={word + index}
                label={word}
                clickable
                color="primary"
                onDelete={() => deleteRow(index)}
              />
            </Tooltip>
          ))}

        <form className={classes.key_word_form}>
          <input
            className={classes.key_word_input_field}
            name="keyword"
            value={newWord}
            onChange={(e) => setNewWord(e.target.value)}
            placeholder="Enter new keyword..."
            required
          />
          <button
            onClick={isEdit ? updateRow : addRow}
            type="submit"
            className={classes.keys_submit_btn}
          >
            {isEdit ? "Edit" : "Add"}
          </button>

          {/* <Chip
            icon={<DoneIcon />}
            label="Add"
            clickable
            color="primary"
            onDelete={addRow}
            type="submit"
            //   deleteIcon={<DoneIcon />}
          /> */}
        </form>
      </div>
    </div>
  );
};

export default NewKeyWord;

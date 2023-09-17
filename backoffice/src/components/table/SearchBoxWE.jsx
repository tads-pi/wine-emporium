import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Search from "@mui/icons-material/Search";
import { Select } from "@mui/material";

export default function SearchBoxWE({
    choices,
    onChangeSearchText,
    searchText,
    onSubmit,
    searchField,
    onChangeSearchField,
}) {
    return (
        <form className="search-box__container">
            <FormControl sx={{ m: 1, width: "10ch" }} variant="outlined">
                {
                    choices &&
                    <Select
                        value={searchField ? searchField : choices[0]}
                        onChange={(e) => {
                            onChangeSearchField(e.target.value)
                        }}
                    >
                        {
                            choices.map((value, i) => (
                                <MenuItem key={i} value={value}>
                                    {value}
                                </MenuItem>
                            ))
                        }
                    </Select>
                }
            </FormControl>

            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Pesquisar</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={"text"}
                    value={searchText}
                    onChange={(e) => {
                        onChangeSearchText(e.target.value)
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            onSubmit(searchText)
                        }
                    }}

                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => {
                                    onSubmit(searchText)
                                }}
                            >
                                <Search />
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password"
                />
            </FormControl>



        </form>
    )
}
